import React from 'react';
import { Box, Stack, Button, Typography, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMaxBed, setLocation } from '../redux/filter';

function CategoryItem({ img, title, cat, bed }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSeeMoreClick = (maxBed) => {
    dispatch(setMaxBed(maxBed));
    // dispatch(setLocation(title));
    navigate('/products');
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '20px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'rgb(161, 161, 172) 0px 2px 6px',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
      onClick={() => handleSeeMoreClick(bed)}  // Set the maxBed value as needed
    >
      <Stack spacing={1}>
        <Typography variant="h5" color="white" textAlign="center">
          {title}
        </Typography>
        <Button
          sx={{
            textTransform: 'none',
            bgcolor: 'primary.main',
            color: 'white',
            fontSize: '14px',
            paddingX: '18px',
            fontWeight: 600,
            paddingY: '8px',
            alignSelf: 'center',
            display: 'flex',
            gap: '10px',
            borderRadius: '16px',
            '&:hover': {
              backgroundColor: '#fc973f',
            },
          }}
          onClick={() => handleSeeMoreClick(3)}  // Set the maxBed value as needed
        >
          SEE NOW
        </Button>
      </Stack>
    </Box>
  );
}

export default CategoryItem;
