import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CardActionArea from '@mui/material/CardActionArea';

// Icons
import PlaceIcon from '@mui/icons-material/Place';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  status: 'NORMAL' | 'OFFLINE';
  speed: number;
  location: string;
  lastUpdate: string;
  isSelected?: boolean;
  warnings?: string[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const isNormal = vehicle.status === 'NORMAL';
  const isSelected = vehicle.isSelected;

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        borderColor: isSelected ? '#2196f3' : 'rgba(0, 0, 0, 0.12)',
        borderWidth: isSelected ? 2 : 1,
        backgroundColor: '#fff',
        boxShadow: isSelected ? '0 0 8px rgba(33, 150, 243, 0.3)' : 'none',
        mb: 2
      }}
    >
      <CardActionArea onClick={() => onClick && onClick(vehicle)}>
        <CardContent sx={{ pb: '16px !important' }}>
          {/* ROW 1: Name, Badge, Time */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                {vehicle.name}
              </Typography>
              
              <Chip
                icon={isNormal ? <CheckCircleIcon sx={{ fontSize: '16px !important' }} /> : <CancelIcon sx={{ fontSize: '16px !important' }} />}
                label={vehicle.status}
                size="small"
                sx={{
                  height: 24,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  backgroundColor: isNormal ? '#e6f4ea' : '#f1f3f4',
                  color: isNormal ? '#137333' : '#5f6368',
                  '& .MuiChip-icon': {
                    color: isNormal ? '#137333' : '#5f6368',
                  }
                }}
              />
            </Box>
            
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                Last update
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                {new Date(vehicle.lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
          </Box>

          {/* ROW 2: License Plate */}
          <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 2 }}>
            {vehicle.licensePlate}
          </Typography>

          {/* ROW 3: Location and Speed */}
          <Box sx={{ display: 'flex', gap: 3, color: 'text.secondary' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PlaceIcon fontSize="small" sx={{ color: '#757575' }} />
              <Typography variant="body2">{vehicle.location}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ShowChartIcon fontSize="small" sx={{ color: '#757575' }} /> 
              <Typography variant="body2">{vehicle.speed} km/h</Typography>
            </Box>
          </Box>

          {/* ROW 4 (Conditional): Warnings */}
          {vehicle.warnings && vehicle.warnings.length > 0 && (
            <>
              <Divider sx={{ my: 1.5 }} />
              {vehicle.warnings.map((warning, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <WarningAmberIcon sx={{ color: '#d32f2f', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#d32f2f' }}>
                    {warning}
                  </Typography>
                </Box>
              ))}
            </>
          )}

        </CardContent>
      </CardActionArea>
    </Card>
  );
}