import { createTheme, ThemeProvider } from '@mui/material/styles';
import { React, useState } from 'react';
import AppBar from '@mui/material/AppBar'; 
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import logoText from '../../Config/Assets/Img/SaylaniLogo.png';
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

function Appbr() {

  const [eventModalShow, setEventModalShow] = useState(false);
  const [jobModalShow, setJobModalShow] = useState(false);

  const handleEventShow = () => {
    setEventModalShow(true);
  };

  const handleEventHide = () => {
    setEventModalShow(false);
  };

  const handleJobShow = () => {
    setJobModalShow(true);
  };

  const handleJobHide = () => {
    setJobModalShow(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        sx={{ position: 'fixed', zIndex: '1000', boxShadow: '0', border: 'solid 1px #BDBDBD' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img
            src={logoText}
            alt="Logo"
            style={{ width: '20%', justifySelf: 'flex-start' }}
          />
          <Box sx={{ flexGrow: 0.1, display: 'flex', justifyContent: 'space-around' }}>
            <Button 
              onClick={handleJobShow} 
              style={{ backgroundColor: '#366db7', padding: '6px 20px', marginLeft: '3%' }}>
              Add New Job
            </Button>
            <Button 
              onClick={handleEventShow} 
              style={{ backgroundColor: '#8dc63f', padding: '6px 20px', marginLeft: '3%' }}>
              Add Event
            </Button>

            <AddEvent 
              show={eventModalShow} 
              onHide={handleEventHide} 
            />

            <AddJob 
              show={jobModalShow} 
              onHide={handleJobHide} 
            />
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Appbr;
