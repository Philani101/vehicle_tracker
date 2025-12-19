import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { type Vehicle } from './VehicleCard';
import EmptyState from './EmptyState';
import { colors, spacing, borderRadius } from '../theme/designTokens';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type VehicleDetailsProp = {
  title: string;
  vehicle?: Vehicle | null;
  loading?: boolean;
};

export default function VehicleDetails({
  title,
  vehicle,
  loading,
}: VehicleDetailsProp) {
  if (loading) {
    return (
      <Box
        sx={{
          marginTop: spacing.md,
          padding: spacing.md,
          bgcolor: colors.background.paper,
          borderRadius: borderRadius.md,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: spacing.md }}>
          {title}
        </Typography>

        <Paper elevation={0} sx={{ p: spacing.md, bgcolor: colors.background.hover }}>
          <Grid container spacing={spacing.md}>
            {[1, 2, 3, 4].map((i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <Skeleton variant="text" width="40%" height={16} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="80%" height={24} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    );
  }

  if (!vehicle) {
    return (
      <Box
        sx={{
          marginTop: spacing.md,
          padding: spacing.md,
          bgcolor: colors.background.paper,
          borderRadius: borderRadius.md,
        }}
      >
        <EmptyState
          title="No Vehicle Selected"
          description="Select a vehicle from the list to view its detailed information and real-time metrics."
          icon={<InfoOutlinedIcon sx={{ fontSize: '64px' }} />}
          variant="default"
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        marginTop: spacing.md,
        marginBottom: spacing.md,
        padding: spacing.md,
        bgcolor: colors.background.paper,
        borderRadius: borderRadius.md,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: spacing.md }}>
        {title}
      </Typography>

      <Paper
        elevation={0}
        sx={{ p: spacing.md, bgcolor: colors.background.hover, borderRadius: borderRadius.md }}
      >
        <Grid container spacing={spacing.md}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="caption"
              sx={{ color: colors.text.secondary, fontWeight: 500 }}
            >
              Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {vehicle.name}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="caption"
              sx={{ color: colors.text.secondary, fontWeight: 500 }}
            >
              License Plate
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {vehicle.licensePlate}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography
              variant="caption"
              sx={{ color: colors.text.secondary, fontWeight: 500 }}
            >
              Status
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color:
                  vehicle.status === 'NORMAL'
                    ? colors.status.success
                    : colors.status.offline,
              }}
            >
              {vehicle.status}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography
              variant="caption"
              sx={{ color: colors.text.secondary, fontWeight: 500 }}
            >
              Speed
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {vehicle.speed} km/h
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography
              variant="caption"
              sx={{ color: colors.text.secondary, fontWeight: 500 }}
            >
              Current Location
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {vehicle.location}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}