import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DarkModeComponent from './DarkModeComponent';
import GoogleLogout from '../Google-SignIn/GoogleLogout';
import usePlayersStore from '../../store/playerStore';
import MenuIcon from '@mui/icons-material/Menu';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';

const pages = [
  { name: 'Home', route: '/' },
  { name: 'Leaderboard', route: '/leaderboard' },
  { name: 'Game Rules', route: '/gamerules' },
];
const settings = [
  { name: 'Profile', route: '/profile' },
  // { name: "Login", route: "/Login" },
];

function NavBar(props) {
  const { player1, player1Logout } = usePlayersStore();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUser = (e) => {
    if (player1) {
      player1Logout();

      // hande user log out when they are in thier profile page
      if (location.pathname.endsWith('/profile')) {
        navigate('/');
      }
    } //Logout
    else {
      navigate('/Login');
    }
  };

  // useEffect(() => {
  //   const isGameBoard = location.pathname.endsWith('/gameboard');
  //   if (player2 && !isGameBoard) {
  //     player2Logout();
  //   }
  // }, [location, player2, player2Logout]);
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <div>
            <DarkModeComponent theme={props.theme} setTheme={props.setTheme} />
          </div>
          <FlightTakeoffIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Caveat", "cursive"',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Catch Me!
          </Typography>

          <Box sx={{ mr: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='medium'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Link
                      to={page.route}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      key={page.route}
                    >
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <FlightTakeoffIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              fontFamily: '"Caveat", "cursive"',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Catch Me!
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                to={page.route}
                style={{ textDecoration: 'none', color: 'inherit' }}
                key={page.route}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <GoogleLogout />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) =>
                setting.name === 'Profile' && player1 ? (
                  <Link
                    to={setting.route}
                    key={setting.route}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>{setting.name}</Typography>
                    </MenuItem>
                  </Link>
                ) : (
                  ''
                )
              )}

              <MenuItem onClick={(e) => handleUser(e)}>
                <Typography textAlign='center'>
                  {player1?.Email ? 'Logout' : 'Login'}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
