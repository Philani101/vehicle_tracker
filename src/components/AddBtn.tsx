import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface AddButtonProps {
  onClick: () => void; // Defines that this button expects a function when used
}

function AddBtn({ onClick }: AddButtonProps) {
  return (
    <Button 
      variant="contained" 
      startIcon={<AddIcon />}
      onClick={onClick}
      sx={{
        marginTop: 1,
        marginDown: 1,  
        textTransform: 'none', // Keeps text from being all-caps
        fontWeight: 'bold' 
      }}
    >
      Add New
    </Button>
  );
}

export default AddBtn;