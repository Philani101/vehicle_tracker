import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { spacing, colors } from '../theme/designTokens';

type SearchBarProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

function SearchBar({ placeholder = 'Search...', onSearch }: SearchBarProps) {
  const [value, setValue] = useState('');

  // Debounce timer
  const debounceTimer = useCallback(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounceTimer();
  };

  return (
    <Box sx={{ marginTop: spacing.md, marginBottom: spacing.md, paddingX: spacing.md }}>
      <TextField
        fullWidth
        id="search-bar"
        placeholder={placeholder}
        variant="outlined"
        value={value}
        onChange={handleChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: colors.text.secondary }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.background.paper,
            '&:hover fieldset': {
              borderColor: colors.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
              boxShadow: `0 0 0 3px ${colors.primary.light}`,
            },
          },
        }}
      />
    </Box>
  );
}

export default SearchBar;