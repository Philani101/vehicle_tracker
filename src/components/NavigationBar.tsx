import { AppBar, Toolbar, Typography, Button, IconButton, Box, Stack, useTheme } from '@mui/material';
import { Menu as MenuIcon, Logout as LogoutIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

// 1. Move Nav items to a config for better maintainability
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

function NavigationBar() {
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" // Better for dashboards than 'static'
      elevation={1} 
      sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar>
        {/* MOBILE: Menu icon only visible on small screens */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* LOGO SECTION */}
        <Box 
          component="img"
          src="/logo_1-removebg-preview.png" 
          alt="Moto+Guard Logo" 
          sx={{ width: 40, height: 40, mr: 1, objectFit: 'contain' }} 
        />
        
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700, 
            color: 'primary.main', // Uses theme primary color instead of 'blue'
            letterSpacing: '-0.5px' 
          }}
        >
          Moto+Guard
        </Typography>

        {/* DESKTOP: Nav Links - hidden on mobile */}
        <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
          {NAV_LINKS.map((item) => (
            <Button key={item.label} color="inherit" sx={{ fontWeight: 500 }}>
              {item.label}
            </Button>
          ))}
        </Stack>

        {/* USER ACTIONS */}
        <Stack direction="row" spacing={0.5}>
          <IconButton aria-label="user account" color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <IconButton aria-label="logout" color="error">
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;