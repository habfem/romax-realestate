import React from 'react'
import { Box, Typography } from '@mui/material';

const BlogList = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px', boxShadow: 'rgb(161, 161, 172) 0px 2px 6px', borderRadius: '8px', marginBottom: '20px' }}>
    <Box sx={{ display: 'flex', alignItems: 'start' }}>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs6BTwyiq0McxzAjK9p0DBSrOe3wO9iyjQBkPkDlezda42QQzqSwHA98kOkGMGoLBxaMY&usqp=CAU" 
          alt="blog"
          style={{ width: '100px', height: '100px', borderRadius: '8px', marginRight: '10px' }}
        />
        <Typography variant="h6">Lorem ipsum</Typography>
      </Box>
      </Box>
  )
}

export default BlogList