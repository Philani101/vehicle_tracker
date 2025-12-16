import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProp = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

// Renamed from StatsBar to SearchBar to match the filename and usage
function SearchBar({ placeholder, onSearch }: SearchBarProp) {
  return (
    <Box sx={{ marginTop: 2, marginBottom: 2, paddingX: 2 }}>
      <TextField
        fullWidth
        id="search-bar"
        placeholder={placeholder}
        variant="outlined"
        onChange={(e) => onSearch(e.target.value)}
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

export default SearchBar;