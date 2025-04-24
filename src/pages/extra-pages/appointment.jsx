import React, { useEffect, useState } from 'react';

// material-ui
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// project imports
import MainCard from 'components/MainCard';

// assets
import defaultImage from 'assets/images/female.png';

// card for each doctor
const DoctorCard = ({ doctor }) => (
  <MainCard
    content={false}
    sx={{ minWidth: 220, maxWidth: 220, mx: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
  >
    <CardMedia
      component="img"
      image={defaultImage}
      alt={doctor.fullName}
      sx={{ height: 150, width: '100%', objectFit: 'cover' }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        {doctor.fullName}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {doctor.specialization}
      </Typography>
      <Button variant="contained" color="primary" fullWidth>
        Book
      </Button>
    </CardContent>
    <Divider />
  </MainCard>
);

// ==============================|| SAMPLE PAGE ||============================== //

export default function AppointmentPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:8082/api/doctors/key/search?keyword=', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);  

  return (
    <MainCard title="Available doctors">
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          p: 1,
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: 4 },
          '&::-webkit-scrollbar-thumb:hover': { background: '#555' }
        }}
      >
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </Box>
    </MainCard>
  );
}
