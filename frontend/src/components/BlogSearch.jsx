import { Box, Typography, TextField } from '@mui/material';
import React from 'react';

const BlogSearch = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px', boxShadow: 'rgb(161, 161, 172) 0px 2px 6px', borderRadius: '8px', marginBottom: '20px' }}>
      {/* Top box containing search bar */}
      <Box sx={{ marginBottom: '20px' }}>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          fullWidth
          size="small"
        />
      </Box>
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>CATEGORIES</Typography>
      {/* Categories */}
      <Typography variant="body1" sx={{ marginBottom: '10px' }}>Accommodation</Typography>
      <Typography variant="body1" sx={{ marginBottom: '10px' }}>Romax Properties</Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>Real Estate</Typography>
    </Box>
  );
};

export default BlogSearch;