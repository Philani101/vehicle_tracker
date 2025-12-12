import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type AlertListProp = {
  title: string;
  children?: React.ReactNode; // Allows you to put AlertCards inside this list
};

export default function AlertList({ title, children }: AlertListProp) {
  const [open, setOpen] = useState(true); // Default to open

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2, padding: 2, bgcolor: '#fff', borderRadius: 1 }}>
      {/* Header - Clickable to toggle */}
      <Box 
        onClick={handleToggle}
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          cursor: 'pointer',
          mb: open ? 2 : 0 // Add margin only when open
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        
        <IconButton size="small" onClick={handleToggle}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
    
      {/* Collapsible Content */}
      <Collapse in={open}>
        <Box>
           {children}
        </Box>
      </Collapse>
    </Box>
  );
}