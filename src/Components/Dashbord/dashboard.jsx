import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import JobIcon from '@mui/icons-material/Dashboard';
import EventReqIcon from '@mui/icons-material/Store';
import EvenstIcon from '@mui/icons-material/Assignment';
import ApplicationIcons from '@mui/icons-material/AppRegistration';
import ChartIcon from '@mui/icons-material/BarChart';
import {Button} from  '@mui/material'
import Appbar from './Apbar'
import AllJobs from '../AdminPage/ViewJobs'
import ApplicationsJobs from '../AdminPage/AppliedJobs'
import ViewEvents from '../AdminPage/ViewEvents'
import DashboardContent from './dashboardContent'
import EventRequest from '../AdminPage/EventRequest'
import { onAuthStateChanged,signOut } from 'firebase/auth'; 
import { auth } from '../Firebase/firebaseConfig'; 
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function DashboardDrawer() {
  const [selectedPage, setSelectedPage] = React.useState('Overview');
  const [userEmail, setUserEmail] = React.useState('');
const navigate=useNavigate()
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });
    return () => unsubscribe();
  }, []);

  const pages = [
    { text: 'All Jobs', icon: <JobIcon /> },
    { text: 'Applications Jobs', icon: <ApplicationIcons /> },
    { text: 'Events', icon: <EvenstIcon /> },
    { text: 'Event Request', icon: <EventReqIcon /> },
    { text: 'Graph', icon: <ChartIcon /> }
  ];

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigate('/SignIn');
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
  };

  const handleListItemClick = (text) => {
    setSelectedPage(text);
  };

  const renderContent = () => {
    switch (selectedPage) {
      case 'All Jobs':
        return <AllJobs />;
      case 'Applications Jobs':
        return <ApplicationsJobs />;
      case 'Events':
        return <ViewEvents />;
      case 'Event Request':
        return <EventRequest />;
        case 'Graph':
        return <DashboardContent />;
      default:
        return <DashboardContent/>;
    }
  };

  return (
    <>
      <Appbar />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              marginTop: '6%',
              zIndex: '30'
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '3%' }}>
            <img
              src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?ga=GA1.1.1068111102.1719742580&semt=ais_hybrid"
              alt="User Avatar"
              style={{ borderRadius: '50%', width: '80px', height: '80px', objectFit: "cover" }}
            />
            <p style={{ marginTop: '4%' }}>{userEmail}</p>
          </div>

          <Divider />
          <List>
            {pages.slice(0, 2).map((page) => (
              <ListItem key={page.text} disablePadding>
                <ListItemButton onClick={() => handleListItemClick(page.text)}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {pages.slice(2, 5).map((page) => (
              <ListItem key={page.text} disablePadding>
                <ListItemButton onClick={() => handleListItemClick(page.text)}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.text} />
                </ListItemButton>
              </ListItem>
            ))}
        <Button  variant='contained' sx={{ px: 10,marginTop:"30%"}} onClick={handleSignOut}>Sign Out</Button>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: '#f4f7fd',
            p: 3,
            width: 'calc(100vw - 260px)', 
            minHeight: '100vh' 
          }}
        >
          <Toolbar />
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}
