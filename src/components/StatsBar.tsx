import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Stack, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid'; // Use Grid2 for MUI v6+
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GpsOffIcon from '@mui/icons-material/GpsOff';

interface Stats {
  total: number;
  active: number;
  alerts: number;
  offline: number;
}

const StatsBar: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statConfig = [
    { label: 'Total Cars', value: stats?.total, icon: <DirectionsCarIcon />, color: 'primary.main' },
    { label: 'Active', value: stats?.active, icon: <CheckCircleOutlineIcon />, color: 'success.main' },
    { label: 'Alerts', value: stats?.alerts, icon: <WarningAmberIcon />, color: 'error.main' },
    { label: 'Offline', value: stats?.offline, icon: <GpsOffIcon />, color: 'text.disabled' },
  ];

  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      {/* Grid container with spacing for gutters */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {statConfig.map((stat, index) => (
          /* Grid2 uses 'size' prop instead of xs/sm/md directly */
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: (theme) => `${stat.color === 'text.disabled' ? theme.palette.action.focus : stat.color + '15'}`,
                    color: stat.color,
                    display: 'flex' 
                  }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight="500">
                      {stat.label}
                    </Typography>
                    {loading ? (
                      <Skeleton width={50} height={32} animation="wave" />
                    ) : (
                      <Typography variant="h5" fontWeight="bold">
                        {stat.value ?? 0}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsBar;