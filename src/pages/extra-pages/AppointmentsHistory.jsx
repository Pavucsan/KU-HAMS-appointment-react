import React, { useEffect, useState } from 'react';

// project imports
import MainCard from 'components/MainCard';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,CircularProgress  } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const getStatusColor = (status) => {
  switch (status) {
    case 'Scheduled':
      return 'primary'; // Blue
    case 'Completed':
      return 'success'; // Green
    case 'Cancelled':
      return 'error';    // Red
    case 'Pending':
      return 'warning';  // Orange
    default:
      return 'default';  // Grey
  }
};

export default function AppointmentHistoryPage() {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const patientId = localStorage.getItem('patientId');
        const response = await fetch(`http://localhost:8082/api/admin/patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <MainCard title="Appointments History" sx={{ mb: 2 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                {/* <TableCell>Patient Name</TableCell> */}
                <TableCell>Doctor Name</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Appointment Date</TableCell>
                <TableCell>Appointment Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  {/* <TableCell>{appointment.patient?.fullName || '-'}</TableCell> */}
                  <TableCell>{appointment.doctor?.fullName || '-'}</TableCell>
                  <TableCell>{appointment.doctor?.specialization || '-'}</TableCell>
                  <TableCell>{appointment.doctor?.email || '-'}</TableCell>
                  <TableCell>{appointment.appointmentDate}</TableCell>
                  <TableCell>{appointment.appointmentTime}</TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </MainCard>
  );
}
