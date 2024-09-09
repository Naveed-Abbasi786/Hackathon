import { createTheme, ThemeProvider } from '@mui/material/styles';
import { React, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar'; 
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { auth, db } from '../Firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logoText from '../../Config/Assets/Img/SaylaniLogo.png';
import { collection, getDocs } from 'firebase/firestore';
import AddJob from '../AdminPage/AddJob';
import AddEvent from '../AdminPage/AddEvent';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#4caf50',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function MyApp() {
  const [eventModalShow, setEventModalShow] = useState(false);
  const [jobModalShow, setJobModalShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handlers for Add Event and Job modals
  const handleEventShow = () => setEventModalShow(true);
  const handleEventHide = () => setEventModalShow(false);
  const handleJobShow = () => setJobModalShow(true);
  const handleJobHide = () => setJobModalShow(false);

  // User menu handling
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // SignOut handler
  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigate('/Signin');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  const SignUp = () => navigate('/');
  const Login = () => navigate('/Signin');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar sx={{position:'relative',boxShadow: '0', border: 'solid 1px #BDBDBD' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={logoText} alt="Logo" style={{ width: '20%', justifySelf: 'flex-start' }} />

          {loggedIn ? (
            <Box sx={{ flexGrow: 0.1, display: 'flex', justifyContent: 'space-around' }}>
           

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{auth.currentUser?.email[0]}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <div>
              <Button variant="contained" onClick={SignUp} color="primary" sx={{ marginRight: 1 }}>
                Sign Up
              </Button>
              <Button variant="contained" onClick={Login} color="secondary">
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Modals for Add Event and Add Job */}
      {eventModalShow && <AddEvent onClose={handleEventHide} />}
      {jobModalShow && <AddJob onClose={handleJobHide} />}
    </ThemeProvider>
  );
}

export default MyApp;
