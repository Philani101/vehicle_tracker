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
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (open) {
      fetchVehicles();
      const interval = setInterval(fetchVehicles, 10000);
      return () => clearInterval(interval);
    }
  }, [open]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/vehicles');
      if (response.ok) {
        const data = await response.json();
        // Filter only active vehicles and add mock coordinates for demo
        const activeVehicles = data
          .filter((v: Vehicle) => v.status === 'NORMAL')
          .map((v: Vehicle, index: number) => ({
            ...v,
            // Mock coordinates - in production, these should come from your backend
            latitude: -26.2041 + (Math.random() - 0.5) * 0.1,
            longitude: 28.0473 + (Math.random() - 0.5) * 0.1
          }));
        setVehicles(activeVehicles);
      }
    } catch (error) {
      console.error('Failed to fetch vehicles', error);
    }
  };

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
      
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        {/* Map Container */}
        <Box 
          id="map" 
          sx={{ 
            width: '100%', 
            height: '100%',
            position: 'relative',
            backgroundColor: '#e0e0e0'
          }}
        >
          {/* Simple visual representation - Replace with actual Leaflet map */}
          <Box sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 1
          }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Map View
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vehicles.length} active vehicle{vehicles.length !== 1 ? 's' : ''} tracked
            </Typography>
          </Box>

          {/* Vehicle markers visualization */}
          {vehicles.map((vehicle, index) => (
            <Box
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              sx={{
                position: 'absolute',
                top: `${20 + index * 15}%`,
                left: `${30 + index * 10}%`,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.2)'
                }
              }}
            >
              <DirectionsCarIcon 
                sx={{ 
                  fontSize: 40,
                  color: vehicle.id === selectedVehicle?.id ? '#2196f3' : '#4caf50',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }} 
              />
            </Box>
          ))}
        </Box>

        {/* Vehicle Info Panel */}
        {selectedVehicle && (
          <Box sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            minWidth: 250,
            zIndex: 1000
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {selectedVehicle.name}
              </Typography>
              <IconButton 
                size="small" 
                onClick={() => setSelectedVehicle(null)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {selectedVehicle.licensePlate}
            </Typography>
            
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Speed
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {selectedVehicle.speed} km/h
              </Typography>
            </Box>
            
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Location
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {selectedVehicle.location}
              </Typography>
            </Box>
            
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Last Update
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {new Date(selectedVehicle.lastUpdate).toLocaleString()}
              </Typography>
            </Box>

            <Chip 
              label={selectedVehicle.status}
              size="small"
              color="success"
              sx={{ mt: 2 }}
            />
          </Box>
        )}

        {/* Vehicle List Panel */}
        <Box sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
          maxWidth: 300,
          maxHeight: 200,
          overflow: 'auto',
          zIndex: 1000
        }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Active Vehicles
          </Typography>
          {vehicles.map((vehicle) => (
            <Box
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                borderRadius: 1,
                cursor: 'pointer',
                backgroundColor: vehicle.id === selectedVehicle?.id ? '#e3f2fd' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <DirectionsCarIcon 
                fontSize="small" 
                sx={{ color: vehicle.id === selectedVehicle?.id ? '#2196f3' : '#4caf50' }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight="500">
                  {vehicle.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {vehicle.speed} km/h
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}