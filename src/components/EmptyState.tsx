import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'compact';
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  variant = 'default',
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: variant === 'compact' ? 3 : 6,
        px: 2,
      }}
    >
      {icon && (
        <Box
          sx={{
            fontSize: variant === 'compact' ? '48px' : '64px',
            opacity: 0.4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      )}

      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant={variant === 'compact' ? 'h6' : 'h5'}
          sx={{
            fontWeight: 700,
            color: '#212121',
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#757575',
            maxWidth: '400px',
          }}
        >
          {description}
        </Typography>
      </Box>

      {action && (
        <Button
          variant="contained"
          onClick={action.onClick}
          sx={{ mt: 2 }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
}