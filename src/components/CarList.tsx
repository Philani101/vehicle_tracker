import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import VehicleCard, { type Vehicle } from './VehicleCard';
import EmptyState from './EmptyState';
import SkeletonCard from './SkeletonCard';
import { colors, spacing, borderRadius } from '../theme/designTokens';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

type CarListProps = {
  title: string;
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
  selectedId?: string;
  loading?: boolean;
};

export default function CarList({
  title,
  vehicles,
  onSelect,
  selectedId,
  loading,
}: CarListProps) {
  const [open, setOpen] = useState(true);

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
      {/* Header */}
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          mb: open ? spacing.md : 0,
          userSelect: 'none',
        }}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setOpen(!open);
          }
        }}
        aria-expanded={open}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title} ({vehicles.length})
        </Typography>
        <IconButton
          size="small"
          aria-label={open ? 'Collapse vehicle list' : 'Expand vehicle list'}
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Collapsible Content */}
      <Collapse in={open}>
        <Box>
          {loading ? (
            <SkeletonCard count={3} />
          ) : vehicles.length === 0 ? (
            <EmptyState
              title="No Vehicles Found"
              description="No vehicles match your search criteria. Try adjusting your filters or add a new vehicle to get started."
              icon={<DirectionsCarIcon sx={{ fontSize: '64px' }} />}
              variant="default"
            />
          ) : (
            vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={{
                  ...vehicle,
                  isSelected: vehicle.id === selectedId,
                }}
                onClick={onSelect}
              />
            ))
          )}
        </Box>
      </Collapse>
    </Box>
  );
}