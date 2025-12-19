import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { colors, spacing, borderRadius } from '../theme/designTokens';

interface AlertCardProps {
  id: string;
  message: string;
  time: string;
  onResolve: (id: string) => void;
}

export default function AlertCard({
  id,
  message,
  time,
  onResolve,
}: AlertCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: colors.status.errorBg,
        borderColor: '#ffcdd2',
        borderWidth: 1,
        borderRadius: borderRadius.md,
        boxShadow: 'none',
        mb: spacing.md,
        transition: 'all 250ms ease-in-out',
        '&:hover': {
          boxShadow: colors.status.error + '20',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: `${spacing.md} !important`,
        }}
      >
        {/* Left Side: Icon & Text */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.md, mb: spacing.md }}>
            <WarningAmberIcon
              sx={{
                color: colors.status.error,
                fontSize: '24px',
                flexShrink: 0,
              }}
              aria-hidden="false"
              role="img"
              aria-label="Alert warning icon"
            />
            <Typography
              variant="body1"
              sx={{
                color: '#5c1b1b',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {message}
            </Typography>
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: colors.status.error,
              fontWeight: 500,
              ml: '40px',
              display: 'block',
            }}
          >
            {time}
          </Typography>
        </Box>

        {/* Right Side: Resolve Button */}
        <Button
          variant="contained"
          onClick={() => onResolve(id)}
          aria-label={`Resolve alert: ${message}`}
          sx={{
            backgroundColor: colors.status.error,
            textTransform: 'none',
            fontWeight: 'bold',
            boxShadow: 'none',
            whiteSpace: 'nowrap',
            ml: spacing.md,
            '&:hover': {
              backgroundColor: '#b71c1c',
              boxShadow: 'none',
            },
            // WCAG AA contrast ratio: 4.5:1 minimum
            color: '#FFFFFF',
          }}
        >
          Resolve
        </Button>
      </CardContent>
    </Card>
  );
}