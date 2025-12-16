import { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface AddBtnProps {
  onVehicleAdded?: () => void;
}

function AddBtn({ onVehicleAdded }: AddBtnProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    licensePlate: '',
    status: 'OFFLINE',
    location: '',
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        setFormData({ name: '', licensePlate: '', status: 'OFFLINE', location: '' }); // Reset
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

      <Dialog open={open} onClose={handleClose}>
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
          <TextField
            margin="dense"
            name="location"
            label="Current Location"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.location}
            onChange={handleChange}
          />
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
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddBtn;