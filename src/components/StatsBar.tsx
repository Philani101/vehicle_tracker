import { useEffect, useState } from 'react';
import { AppBar } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GpsOffIcon from '@mui/icons-material/GpsOff';
import Typography from '@mui/material/Typography';

interface Stats {
  total: number;
  active: number;
  alerts: number;
  offline: number;
}

function StatsBar() {
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, alerts: 0, offline: 0 });

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    // Optional: Poll every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { label: 'Total Cars Tracked', value: stats.total, icon: <DirectionsCarIcon sx={{ margin: '12px', fontSize: 40, color: 'blue' }} />, color: 'text.secondary' },
    { label: 'Active', value: stats.active, icon: <CheckCircleOutlineIcon sx={{ margin: '12px', fontSize: 40, color: 'green' }} />, color: 'text.secondary' },
    { label: 'Alerts', value: stats.alerts, icon: <WarningAmberIcon sx={{ margin: '12px', fontSize: 40, color: 'red' }} />, color: 'error.main' }, // changed color to MUI error
    { label: 'Offline', value: stats.offline, icon: <GpsOffIcon sx={{ margin: '12px', fontSize: 40, color: 'gray' }} />, color: 'text.secondary' },
  ];

  return (
    <AppBar position="static" sx={{ display: 'flex', marginTop: 1, flexDirection: 'row', bgcolor: '#ffff', boxShadow: 'none' }} >
      {statCards.map((stat, index) => (
        <Card key={index} sx={{ minWidth: 50, flexGrow: 1, display: 'flex', alignItems: 'center', border: 'none', boxShadow: 'none' }}>
          {stat.icon}
          <CardContent sx={{ padding: '16px 0 !important' }}>
            <Typography variant="h6" component="section" sx={{ fontSize: '1rem', lineHeight: 1.2 }}>
              {stat.label}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 0.5 }} color={stat.color}>
              {stat.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </AppBar>
  )
}

export default StatsBar;