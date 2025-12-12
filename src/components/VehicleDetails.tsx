import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


type VehicleDetailsProp = {
  title: string;
};

export default function VehicleDetails({title}: VehicleDetailsProp) {
  return (
    <Box sx={{ marginTop: 1, marginBottom: 1, padding: 2, bgcolor: '#ffff' }}>
      {/* Header */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>   
    </Box>
    
  );
}