import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import VehicleCard, { type Vehicle } from './VehicleCard';

type CarListProp = {
  title: string;
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
  selectedId?: string;
};

export default function CarList({ title, vehicles, onSelect, selectedId }: CarListProp) {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ 
      marginTop: 2, 
      marginBottom: 2, 
      padding: 2, 
      bgcolor: '#fff', 
      borderRadius: 1 
    }}>
      {/* Header */}
      <Box 
        onClick={handleToggle}
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          cursor: 'pointer',
          mb: open ? 2 : 0 
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title} ({vehicles.length})
        </Typography>
        <IconButton size="small">
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Collapsible Content */}
      <Collapse in={open}>
        <Box>
          {vehicles.length === 0 ? (
             <Typography color="text.secondary">No vehicles found.</Typography>
          ) : (
            vehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={{...vehicle, isSelected: vehicle.id === selectedId}}
                onClick={onSelect}
              />
            ))
          )}
        </Box>
      </Collapse>
    </Box>
  );
}