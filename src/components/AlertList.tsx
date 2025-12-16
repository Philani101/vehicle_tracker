import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AlertCard from './AlertCard';

interface Alert {
  id: string;
  message: string;
  time: string;
}

type AlertListProp = {
  title: string;
};

export default function AlertList({ title }: AlertListProp) {
  const [open, setOpen] = useState(true);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/alerts');
      if (response.ok) {
        setAlerts(await response.json());
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/alerts/${id}/resolve`, {
        method: 'PATCH',
      });
      if (response.ok) {
        // Optimistic update: remove from list immediately
        setAlerts(prev => prev.filter(alert => alert.id !== id));
      }
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 15000); // Poll for new alerts
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => setOpen(!open);

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2, padding: 2, bgcolor: '#fff', borderRadius: 1 }}>
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
          {title} ({alerts.length})
        </Typography>
        <IconButton size="small">
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
    
      <Collapse in={open}>
        <Box>
          {alerts.length === 0 ? (
            <Typography color="text.secondary">No active alerts.</Typography>
          ) : (
            alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                id={alert.id}
                message={alert.message}
                time={alert.time}
                onResolve={handleResolve}
              />
            ))
          )}
        </Box>
      </Collapse>
    </Box>
  );
}