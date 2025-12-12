import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function NavigationBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#ffff' }} >
        <Toolbar>
          {/* Hamburger Menu Icon for mobile*/}
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img src="../public/logo_1-removebg-preview.png" alt="Logo" style={{ width: '120px', height: '60', marginRight: '10px' }} />
          {/* Logo / Title */}
          <Typography variant="h6" component="section" sx={{ flexGrow: 1, color: 'blue' }}>
            Moto+Guard
          </Typography>

          {/* Navigation Links */}
          <Button >Home</Button>
          <Button >About</Button>
          <Button >Login</Button>
          <Button startIcon={<AccountCircleIcon />}></Button>
          <Button startIcon={<LogoutIcon />}></Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavigationBar