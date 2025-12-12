import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VehicleCard from './VehicleCard';
import { Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type CarListProp = {
  title: string;
   children?: React.ReactNode; // Allows you to put VehicleCards inside this list
};

export default function CarList({title, children}: CarListProp) {
    const [open, setOpen] = useState(true); // Default to open

    const handleToggle = () => {
      setOpen(!open);
    };
  
    return (
    <Box sx={{ mdisplay: 'flex',
          bgcolor: '#fff', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          cursor: 'pointer',
          mb: open ? 2 : 0 // Add margin only when open
           }}>
      {/* Header */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>

      <IconButton size="small" onClick={handleToggle}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
       {/* Collapsible Content */}
      <Collapse in={open}>
        <Box>
           <VehicleCard 
        vehicle={{
          id: '1',
          name: 'Toyota Camry',
          licensePlate: 'ABC-1234',
          status: 'NORMAL',
          speed: 65,
          location: 'Los Angeles, CA',
          lastUpdate: '2024-06-15T10:30:00Z',
          isSelected: true,
          warnings: [],
        }}
      />
        </Box>
      </Collapse>
      
      
           
    </Box>
    
  );
}