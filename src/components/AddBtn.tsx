import { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid'; // Updated import for MUI v6+
import { debounce } from '@mui/material/utils';

interface AddBtnProps {
  onVehicleAdded?: () => void;
}

interface LocationOption {
  display_name: string;
  lat: string;
  lon: string;
}

function AddBtn({ onVehicleAdded }: AddBtnProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    licensePlate: '',
    status: 'OFFLINE',
    location: '',
    latitude: 0,
    longitude: 0,
  });

  // Location Search State
  const [locationOpen, setLocationOpen] = useState(false);
  const [options, setOptions] = useState<readonly LocationOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Debounced search to avoid spamming the API
  const fetchLocations = useMemo(
    () =>
      debounce(async (request: { input: string }, callback: (results?: readonly LocationOption[]) => void) => {
        try {
          if (request.input.length < 3) {
             callback([]);
             return;
          }
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(request.input)}`
          );
          if (response.ok) {
            const data = await response.json();
            callback(data);
          } else {
            callback([]);
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          callback([]);
        }
      }, 500),
    [],
  );

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(formData.location ? [] : []);
      return undefined;
    }

    setLoading(true);

    fetchLocations({ input: inputValue }, (results?: readonly LocationOption[]) => {
      if (active) {
        let newOptions: readonly LocationOption[] = [];
        if (results) {
          newOptions = [...results];
        }
        setOptions(newOptions);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetchLocations, formData.location]);

  const handleClickOpen = () => setOpen(true);
  
  const handleClose = () => {
    setOpen(false);
    setOptions([]);
    setInputValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (onVehicleAdded) onVehicleAdded();
        handleClose();
        // Reset form
        setFormData({ 
            name: '', 
            licensePlate: '', 
            status: 'OFFLINE', 
            location: '', 
            latitude: 0, 
            longitude: 0 
        });
        setInputValue('');
      } else {
        alert('Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <>
      <Button 
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{
          marginTop: 1,
          textTransform: 'none',
          fontWeight: 'bold' 
        }}
      >
        Add New
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Vehicle Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="licensePlate"
            label="License Plate"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.licensePlate}
            onChange={handleChange}
          />

          {/* Location Search Field */}
          <Autocomplete
            id="location-search"
            sx={{ mt: 1, mb: 0.5 }}
            open={locationOpen}
            onOpen={() => setLocationOpen(true)}
            onClose={() => setLocationOpen(false)}
            isOptionEqualToValue={(option, value) => option.display_name === value.display_name}
            getOptionLabel={(option) => option.display_name}
            options={options}
            loading={loading}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onChange={(event, newValue: LocationOption | null) => {
              if (newValue) {
                setFormData({
                  ...formData,
                  location: newValue.display_name,
                  latitude: parseFloat(newValue.lat),
                  longitude: parseFloat(newValue.lon)
                });
              } else {
                // clear location if cleared
                setFormData({
                    ...formData,
                    location: '',
                    latitude: 0,
                    longitude: 0
                });
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Location"
                fullWidth
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          {/* Coordinates Feedback - Updated to use Grid2 */}
          <Grid container spacing={2}>
            <Grid size={6}>
                 <TextField
                    margin="dense"
                    label="Latitude"
                    value={formData.latitude || ''}
                    fullWidth
                    disabled
                    variant="filled"
                    size="small"
                 />
            </Grid>
            <Grid size={6}>
                 <TextField
                    margin="dense"
                    label="Longitude"
                    value={formData.longitude || ''}
                    fullWidth
                    disabled
                    variant="filled"
                    size="small"
                 />
            </Grid>
          </Grid>

          <TextField
            select
            margin="dense"
            name="status"
            label="Status"
            fullWidth
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="NORMAL">Normal</MenuItem>
            <MenuItem value="OFFLINE">Offline</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!formData.location}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddBtn;