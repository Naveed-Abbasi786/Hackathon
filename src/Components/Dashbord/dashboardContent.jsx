import React from 'react';
import Cards from '../Dashbord/Cards';
import { Box } from '@mui/material';
import LinePieChart from '../Dashbord/LinePieChart'
export default function DashboardContent() {
  return (
    <>
      <Box
      sx={{width:'100%'}}>
      <Cards/>
      <LinePieChart/>
      </Box>
    </>
  );
}
