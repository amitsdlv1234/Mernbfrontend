import React from 'react';
import { Typography, Container } from '@mui/material';

const AdminDashboard = ({ adminName }) => {
  return (
    <Container>
      <Typography variant="h4">Welcome to the Admin Dashboard, {adminName}!</Typography>
      {/* Other dashboard content goes here */}
    </Container>
  );
};

export default AdminDashboard;
