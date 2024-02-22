import React from 'react';
import SortIcon from '@mui/icons-material/Sort';
import IconButton from '@mui/material/IconButton';

const AlphabetArrows = () => {
  return (
    <IconButton>
      <SortIcon sx={{ transform: 'rotate(-45deg)' }} />
    </IconButton>
  );
};

export default AlphabetArrows;

