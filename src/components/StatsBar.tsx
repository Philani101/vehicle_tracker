import { AppBar } from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GpsOffIcon from '@mui/icons-material/GpsOff';
import Typography from '@mui/material/Typography';


function StatsBar() {
  return (
    <AppBar position="static" sx={{display: 'flex', marginTop: 1, marginDown: 1, flexDirection: 'row', bgcolor: '#ffff' }} >
        <Card sx={{ minWidth: 50, flexGrow: 1 }}>
            <DirectionsCarIcon sx={{ margin: '12px', fontSize: 40, color: 'blue' }} />
            <CardContent>
                <Typography variant="h6" component="section">
                    Total Cars Tracked
                </Typography>
                <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    150
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
        <Card sx={{ minWidth: 50, flexGrow: 1 }}>
            <CheckCircleOutlineIcon sx={{ margin: '12px', fontSize: 40, color: 'green' }} />
            <CardContent>
                <Typography variant="h6" component="section">
                    Active
                </Typography>
                <Typography color="text.secondary">
                    150
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
        <Card sx={{ minWidth: 50, flexGrow: 1 }}>
            <WarningAmberIcon sx={{ margin: '12px', fontSize: 40, color: 'red' }} />
            <CardContent>
                <Typography variant="h6" component="section">
                    Alerts
                </Typography>
                <Typography sx={{ mb: 0.5 }} color="text.warning">
                    50
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
        <Card sx={{ minWidth: 50, flexGrow: 1}}>
            <GpsOffIcon sx={{ margin: '12px', fontSize: 40, color: 'gray' }} />
            <CardContent>
                <Typography variant="h6" component="section">
                    Offline
                </Typography>
                <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    95
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    </AppBar>
  )
}

export default StatsBar