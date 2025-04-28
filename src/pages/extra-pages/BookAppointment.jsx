import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, TextField, Button, Typography, Divider } from '@mui/material';
import MainCard from 'components/MainCard';

export default function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  
  const [doctor, setDoctor] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 16);
    setDateTime(formattedDate);

    const token = localStorage.getItem('authToken');
    console.log('Fetching doctor with token:', doctorId, token);
    fetch(`http://localhost:8082/api/doctors/${doctorId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setDoctor(data))
      .catch((error) => console.error('Error fetching doctor:', error));
  }, [doctorId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
        const token = localStorage.getItem('authToken');
        const patientId = localStorage.getItem('patientId');
        const response = await fetch('http://localhost:8082/api/admin/book', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patientId: Number(patientId),
                doctorId: Number(doctorId),
                dateTime: dateTime
            })
        });

        // Log the response object to inspect it
        const responseBody = await response.text(); // Get the response as text
        console.log("Response Body:", responseBody); // Log the raw response
        const data = JSON.parse(responseBody); // Try to parse it
        console.log("Parsed Data:", data); // Log the parsed data

        if (response.ok) {
            setMessage('Appointment booked successfully!');
            setDateTime('');
            navigate('/public/appointment/history'); // Redirect to appointment page
            alert('Appointment booked successfully!')
        } else {
            setMessage(`Error: ${data.message || 'Failed to book appointment'}`);
        }
    } catch (error) {
        setMessage(`Error: ${error.message}`);
    } finally {
        setLoading(false);
    }
};

  

  const handleBack = () => {
    navigate('/public/appointment');
  };

  return (
    <MainCard title="Book Appointment" sx={{ mb: 2 }}>
      {doctor ? (
        <>
          <Typography variant="h5" gutterBottom>
            Dr. {doctor.fullName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Specialization: {doctor.specialization}
          </Typography>

          {doctor.experience && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Experience: {doctor.experience} years
            </Typography>
          )}

          {doctor.hospital && (
            <Typography variant="body2" color="text.secondary">
              Hospital: {doctor.hospital}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />
        </>
      ) : (
        <Typography>Loading doctor information...</Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
         

          <TextField
            label="Appointment Date & Time"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? 'Booking...' : 'Book Appointment'}
            </Button>
          </Stack>

          {message && (
            <Typography sx={{ mt: 2 }} color={message.startsWith('Error') ? 'error' : 'success.main'}>
              {message}
            </Typography>
          )}
        </Stack>
      </form>
    </MainCard>
  );
}
