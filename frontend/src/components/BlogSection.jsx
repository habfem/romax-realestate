import { Grid, Box, useMediaQuery, Typography, Button } from '@mui/material';
import React from 'react';

const BlogSection = () => {
  const isNonMobile = useMediaQuery("(min-width:968px)");

  return (
    <Grid container spacing={1} sx={{ padding: isNonMobile ? 1 : 2 }}>
      <Box
        sx={{
          //backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs6BTwyiq0McxzAjK9p0DBSrOe3wO9iyjQBkPkDlezda42QQzqSwHA98kOkGMGoLBxaMY&usqp=CAU)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          padding: "20px",
          height: "600px",
          width: "100%",
          boxShadow: "rgb(161, 161, 172) 0px 2px 6px",
          borderRadius: "8px",
        }}
      >
        <img 
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs6BTwyiq0McxzAjK9p0DBSrOe3wO9iyjQBkPkDlezda42QQzqSwHA98kOkGMGoLBxaMY&usqp=CAU'
        style={{ width: "100%", height: "75%", objectFit: "cover", borderRadius: "8px" }}
        alt='blog' />
        <Typography variant="h6">Lorem, ipsum.</Typography>
        <Typography variant="body1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi deserunt voluptatem quidem ad laborum repudiandae?</Typography>
        <br />
        <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "primary.main",

                borderRadius: "8px",
                borderColor: "primary.main",
                borderWidth: "2px",
                "&:hover": {
                  color: "#FFFFFF",
                  bgcolor: "primary.main",
                },
              }}
            >
              <Typography variant="body2"> Read More</Typography>
            </Button>
      </Box>
    </Grid>
  );
};

export default BlogSection;
