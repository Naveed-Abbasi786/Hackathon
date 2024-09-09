import React from 'react';
import { Box, Card, CardActions, CardContent, Button, Typography, Link } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import JobIcon from '@mui/icons-material/Dashboard';
import EventReqIcon from '@mui/icons-material/Store';
import EvenstIcon from '@mui/icons-material/Assignment';
import ApplicationIcons from '@mui/icons-material/AppRegistration';
const Cards = () => {
  

  return (
    <Box 
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 2,
    }}
  >
    <Card sx={{ width: '250px', backgroundColor: 'white' }} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Total Jobs
          </Typography>
          <Link href="#">Details</Link>
        </Box>
        <Typography sx={{ fontSize: 25, fontWeight: 600, marginTop: 3 }}>
          185
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          size="medium"
          variant="contained"
          sx={{
            backgroundColor: '#61ca32',
            borderRadius: 150,
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            gap: '8px',
          }}
        >
          <ArrowUpwardIcon sx={{ fontSize: 18 }} />
          +123%
        </Button>
        <Button
          sx={{
            width: '50px',
            height: '50px',
            backgroundColor: '#f4f7fd',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
      <JobIcon/>
        </Button>
      </CardActions>
    </Card>

    <Card sx={{ width: '250px', backgroundColor: 'white' }} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Application Jobs
          </Typography>
          <Link href="#">Details</Link>
        </Box>
        <Typography sx={{ fontSize: 25, fontWeight: 600, marginTop: 3 }}>
          2839
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          size="medium"
          variant="contained"
          sx={{
            backgroundColor: '#61ca32',
            borderRadius: 150,
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            gap: '8px',
          }}
        >
          <ArrowUpwardIcon sx={{ fontSize: 18 }} />
          +13%
        </Button>
        <Button
          sx={{
            width: '50px',
            height: '50px',
            backgroundColor: '#f4f7fd',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
      <ApplicationIcons/>
        </Button>
      </CardActions>
    </Card>


    <Card sx={{ width: '250px', backgroundColor: 'white' }} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Total Events
          </Typography>
          <Link href="#">Details</Link>
        </Box>
        <Typography sx={{ fontSize: 25, fontWeight: 600, marginTop: 3 }}>
          1283
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          size="medium"
          variant="contained"
          sx={{
            backgroundColor: '#61ca32',
            borderRadius: 150,
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            gap: '8px',
          }}
        >
          <ArrowUpwardIcon sx={{ fontSize: 18 }} />
          +34%
        </Button>
        <Button
          sx={{
            width: '50px',
            height: '50px',
            backgroundColor: '#f4f7fd',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
      <EvenstIcon/>
        </Button>
      </CardActions>
    </Card>


    <Card sx={{ width: '250px', backgroundColor: 'white' }} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Total Event Request
          </Typography>
          <Link href="#">Details</Link>
        </Box>
        <Typography sx={{ fontSize: 25, fontWeight: 600, marginTop: 3 }}>
          839
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          size="medium"
          variant="contained"
          sx={{
            backgroundColor: '#e62e4f',
            borderRadius: 150,
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            gap: '8px',
          }}
        >
          <ArrowDownwardIcon sx={{ fontSize: 18 }} />
          -123%
        </Button>
        <Button
          sx={{
            width: '50px',
            height: '50px',
            backgroundColor: '#f4f7fd',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
      <ApplicationIcons/>
        </Button>
      </CardActions>
    </Card>

  </Box>
  );
};

export default Cards;
