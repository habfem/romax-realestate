import { useState } from 'react';
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
  Modal,
  Box,
  MenuItem,
  Select,
} from '@mui/material';

function TravelTime() {
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState('');
  const [travelTime, setTravelTime] = useState(null);
  const [travelMode, setTravelMode] = useState('driving'); // Default travel mode is driving

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleTravelModeChange = (event) => {
    setTravelMode(event.target.value);
  };

  const handleCalculateTravelTime = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=your_origin&destinations=${destination}&mode=${travelMode}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data from Google Maps API');
      }

      const data = await response.json();
      const durationText = data.rows[0].elements[0].duration.text;

      setTravelTime(durationText);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            Calculate travel times
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Travel time to destination:</Typography>
          {travelTime && <Typography variant="body2">{travelTime}</Typography>}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleOpen}>
            Add a Travel destination
          </Button>
        </Grid>
      </Grid>

      {/* Modal for adding a travel destination */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', borderRadius: 8, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Travel Destination
          </Typography>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter a location"
              placeholder="e.g. NW3, school or station"
              value={destination}
              onChange={handleDestinationChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="body1">Select travel mode:</Typography>
            <Select value={travelMode} onChange={handleTravelModeChange} fullWidth>
              <MenuItem value="driving">Driving</MenuItem>
              <MenuItem value="walking">Walking</MenuItem>
              <MenuItem value="bicycling">Cycling</MenuItem>
            </Select>
          </Grid>
          <Button variant="contained" onClick={handleCalculateTravelTime} sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default TravelTime;
