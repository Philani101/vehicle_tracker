import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

// Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  status: 'NORMAL' | 'OFFLINE';
  speed: number;
  location: string;
  lastUpdate: string;
  latitude?: number;
  longitude?: number;
}

interface VehicleMapDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function VehicleMapDialog({ open, onClose }: VehicleMapDialogProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (open) {
      fetchVehicles();
      const interval = setInterval(fetchVehicles, 10000);
      return () => clearInterval(interval);
    }
  }, [open]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/vehicles');
      if (response.ok) {
        const data = await response.json();
        // Filter active vehicles. 
        // IMPORTANT: We use the REAL latitude/longitude from the database now.
        const activeVehicles = data.filter((v: Vehicle) => 
            v.status === 'NORMAL' && v.latitude && v.longitude
        );
        setVehicles(activeVehicles);
      }
    } catch (error) {
      console.error('Failed to fetch vehicles', error);
    }
  };

  // Default center (Johannesburg) if no vehicles exist
  const defaultCenter = { lat: -26.2041, lng: 28.0473 };
  
  // Center the map on the first vehicle if available
  const center = vehicles.length > 0 && vehicles[0].latitude && vehicles[0].longitude
    ? { lat: vehicles[0].latitude, lng: vehicles[0].longitude } 
    : defaultCenter;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { height: '90vh' }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DirectionsCarIcon />
          <Typography variant="h6">Vehicle Tracking Map</Typography>
          <Chip 
            label={`${vehicles.length} Active`} 
            size="small" 
            color="success"
          />
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Real Map Container */}
        {open && (
             <MapContainer 
                center={center} 
                zoom={13} 
                style={{ height: '100%', width: '100%', flexGrow: 1 }}
             >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {vehicles.map((vehicle) => (
                    (vehicle.latitude && vehicle.longitude) ? (
                        <Marker 
                            key={vehicle.id} 
                            position={[vehicle.latitude, vehicle.longitude]}
                        >
                            <Popup>
                                <Box>
                                    <Typography variant="subtitle2" fontWeight="bold">{vehicle.name}</Typography>
                                    <Typography variant="body2">{vehicle.licensePlate}</Typography>
                                    <Typography variant="caption" display="block">Speed: {vehicle.speed} km/h</Typography>
                                    <Typography variant="caption">Last Update: {new Date(vehicle.lastUpdate).toLocaleTimeString()}</Typography>
                                </Box>
                            </Popup>
                        </Marker>
                    ) : null
                ))}
             </MapContainer>
        )}
      </DialogContent>
    </Dialog>
  );
}