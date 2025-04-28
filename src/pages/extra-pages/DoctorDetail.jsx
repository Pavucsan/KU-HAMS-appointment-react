import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import MainCard from 'components/MainCard'; // Import MainCard component for card layout
import CardMedia from '@mui/material/CardMedia'; // Import CardMedia for displaying images
import CardContent from '@mui/material/CardContent'; // Import CardContent for card content
import Typography from '@mui/material/Typography'; // Import Typography for text styling
import Button from '@mui/material/Button'; // Import Button for action buttons
import defaultImage from 'assets/images/female.png';

export default function DoctorDetailPage() {
    const { id } = useParams(); // Get the doctor ID from the URL parameters
    const [doctor, setDoctor] = useState(null); // State to hold doctor details
    
    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Get the token from local storage
        fetch(`http://localhost:8082/api/doctors/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then((response) => response.json())
        .then((data) => setDoctor(data))
        .catch((error) => console.error('Error fetching doctor details:', error));
    }, [id]);
    
    if (!doctor) return <div>Loading...</div>; // Show loading state while fetching data
    
    return (
        <MainCard title={doctor.fullName}>
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
            <Button variant="contained" color="primary" fullWidth onClick={() => window.location.href = `/public/appointment/book/${doctor.id}`}>
            Scheduler Appointment
            </Button>
        </CardContent>
        </MainCard>
    );
}
