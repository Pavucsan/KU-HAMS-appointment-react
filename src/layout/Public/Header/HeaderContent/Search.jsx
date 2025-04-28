import React, { useState, useEffect, useRef } from 'react';
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Popper,
  Button
} from '@mui/material';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { useNavigate } from 'react-router';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [drClick, setDrClick] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    const token = localStorage.getItem('authToken');
    console.log('Sending request with token:', token);

    if (!query) {
      setResults([]);
      setOpen(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8082/api/doctors/key/search?keyword=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data.slice(0, 5));
      setOpen(true);
    } catch (error) {
      console.error('Search failed:', error);
      setOpen(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => handleSearch(searchText), 300);
    return () => clearTimeout(delay);
  }, [searchText]);

  const handleSelect = (doctor) => {
    console.log('Selected doctor:', doctor);
    if (doctor) {
      setSearchText(doctor.fullName);
      navigate(`/public/doctors/${doctor.id}`);
      setOpen(false);
      setDrClick(true);
    }
  };

  const openApplication = () => {
    navigate(`/public/appointment`);
    setSearchText('');
    setResults([]);
    setOpen(false);
    setDrClick(false);
  };

  const goHome = () => {
    navigate('/public/appointment'); // Navigate to home page
    setSearchText('');
    setResults([]);
    setOpen(false);
    setDrClick(false);
  };

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 }, position: 'relative', display: 'flex', alignItems: 'center', gap: 1 }}>
      <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
        <OutlinedInput
          size="small"
          id="header-search"
          inputRef={inputRef}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          placeholder="Find Doctors by name, specialty, or condition"
          value={searchText}
          onChange={(e) => {
            if (!e.target.value) {
              openApplication();
            } else {
              setSearchText(e.target.value);
            }
          }}
          inputProps={{
            'aria-label': 'search-doctor'
          }}
        />
      </FormControl>

      {/* Home Button */}
      <Button variant="contained" color="warning" onClick={goHome} size="small">
        Home
      </Button>

      <Popper open={open} anchorEl={inputRef.current} style={{ zIndex: 1300 }}>
        <Paper elevation={3} sx={{ width: 224 }}>
          <List dense>
            {results.map((doctor, index) => (
              <ListItem
                button
                key={doctor.id || index}
                onClick={() => handleSelect(doctor)}
              >
                <ListItemText
                  primary={doctor.fullName}
                  secondary={doctor.specialization}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </Box>
  );
}
