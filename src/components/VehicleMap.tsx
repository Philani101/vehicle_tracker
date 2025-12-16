import Button from '@mui/material/Button';
import MapIcon from '@mui/icons-material/Map';
import Box from '@mui/material/Box';

export default function VehicleMap() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
      <Button 
        variant="contained" 
        startIcon={<MapIcon />}
        sx={{ width: '100%', maxWidth: '300px' }}
        onClick={() => console.log("Map view toggled")} // Placeholder for map logic
      >
        View Map
      </Button>
    </Box>
  );
}