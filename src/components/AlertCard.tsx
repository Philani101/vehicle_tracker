import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface AlertCardProps {
  id: string;
  message: string;
  time: string;
  onResolve: (id: string) => void;
}

export default function AlertCard({ id, message, time, onResolve }: AlertCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: '#fff5f5', // Very light red background
        borderColor: '#ffcdd2',     // Light red border
        borderWidth: 1,
        borderRadius: 2,
        boxShadow: 'none',
        mb: 2 // Margin bottom for spacing between alerts
      }}
    >
      <CardContent sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '16px !important' // Override default padding
      }}>
        {/* Left Side: Icon & Text */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <WarningAmberIcon sx={{ color: '#d32f2f' }} />
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#5c1b1b', // Dark red/brown text for readability
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              {message}
            </Typography>
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#d32f2f', // Red text for time
              fontWeight: 500,
              ml: 4.5 // Align with text (skipping icon width)
            }}
          >
            {time}
          </Typography>
        </Box>

        {/* Right Side: Resolve Button */}
        <Button 
          variant="contained" 
          onClick={() => onResolve(id)}
          sx={{
            backgroundColor: '#d32f2f',
            textTransform: 'none',
            fontWeight: 'bold',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#b71c1c',
              boxShadow: 'none',
            }
          }}
        >
          Resolve
        </Button>
      </CardContent>
    </Card>
  );
}