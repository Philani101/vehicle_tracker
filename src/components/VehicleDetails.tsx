import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type Vehicle } from './VehicleCard';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

type VehicleDetailsProp = {
  title: string;
  vehicle?: Vehicle | null;
};

export default function VehicleDetails({ title, vehicle }: VehicleDetailsProp) {
  if (!vehicle) {
    return (
      <Box sx={{ marginTop: 2, padding: 2, bgcolor: '#ffff', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">Select a vehicle to view details</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2, padding: 2, bgcolor: '#ffff' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>   
      
      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
             <Typography variant="caption" color="text.secondary">Name</Typography>
             <Typography variant="body1" fontWeight="500">{vehicle.name}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
             <Typography variant="caption" color="text.secondary">License Plate</Typography>
             <Typography variant="body1" fontWeight="500">{vehicle.licensePlate}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
             <Typography variant="caption" color="text.secondary">Status</Typography>
             <Typography variant="body1" color={vehicle.status === 'NORMAL' ? 'green' : 'gray'}>{vehicle.status}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
             <Typography variant="caption" color="text.secondary">Speed</Typography>
             <Typography variant="body1">{vehicle.speed} km/h</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
             <Typography variant="caption" color="text.secondary">Current Location</Typography>
             <Typography variant="body1">{vehicle.location}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}