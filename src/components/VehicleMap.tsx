// src/components/VehicleMap.tsx
import { useState } from 'react';
import Button from '@mui/material/Button';
import MapIcon from '@mui/icons-material/Map';
import Box from '@mui/material/Box';
import VehicleMapDialog from './VehicleMapDialog';

export default function VehicleMap() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<MapIcon />}
          sx={{ 
            width: '100%', 
            maxWidth: '300px',
            textTransform: 'none',
            fontWeight: 'bold'
          }}
          onClick={() => setOpen(true)}
        >
          View Map
        </Button>
      </Box>
      
      <VehicleMapDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}