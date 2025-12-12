import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type StatsBarProp = {
  placeholder?: string;
};

function StatsBar({placeholder}: StatsBarProp) {
  return (
    <Box sx={{ marginTop: 1, marginDown: 1, width: '20%' }}>
      <TextField
        fullWidth
        id="search-bar"
        placeholder={placeholder}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}

export default StatsBar;