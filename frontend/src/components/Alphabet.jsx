import React from 'react';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';

// Custom sorting icon with colored bars
const CustomSortIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  '& .bar': {
    width: '20px',
    height: '4px',
    margin: '2px 0',
    borderRadius: '2px',
  },
  '& .barA': {
    backgroundColor: 'green',
  },
  '& .barB': {
    backgroundColor: 'blue',
  },
  '& .barC': {
    backgroundColor: 'yellow',
  },
  '& .barD': {
    backgroundColor: 'orange',
  },
  '& .barF': {
    backgroundColor: 'red',
  },
}));

// Example usage
const AlphabetArrows = () => {
  return (
    <IconButton>
      <CustomSortIcon>
        <div className="bar barA"></div>
        <div className="bar barB"></div>
        <div className="bar barC"></div>
        <div className="bar barD"></div>
        <div className="bar barF"></div>
      </CustomSortIcon>
    </IconButton>
  );
}

export default AlphabetArrows;
