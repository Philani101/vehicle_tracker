import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { spacing } from '../theme/designTokens';

interface SkeletonCardProps {
  count?: number;
}

export default function SkeletonCard({ count = 3 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{ mb: spacing.md }}
        >
          <CardContent>
            {/* Header skeleton */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: spacing.md }}>
              <Skeleton variant="text" width="40%" height={32} />
              <Skeleton variant="text" width="20%" height={32} />
            </Box>

            {/* Secondary text skeleton */}
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: spacing.md }} />

            {/* Multiple lines skeleton */}
            <Skeleton variant="text" width="100%" height={16} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="85%" height={16} />
          </CardContent>
        </Card>
      ))}
    </>
  );
}