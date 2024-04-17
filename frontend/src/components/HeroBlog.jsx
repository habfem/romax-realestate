import React from 'react';
import { Box, Typography, Container, Grid, styled } from '@mui/material';

const StyledBlogTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(2),
  color: 'black',
}));

const HeroBlog = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${"https://i.ibb.co/z68mXzk/Whats-App-Image-2023-09-04-at-06-30-03.jpg"})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledBlogTitle variant="h3" align="center">
              BLOG ESTATE
            </StyledBlogTitle>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="black">
              Exceptional Read About Romax Properties
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroBlog;
