import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router";
import { Container, Grid, Paper, Stack } from "@mui/material";
import { Button, Typography, Box } from "@mui/material";
import { ChevronRight, HomeOutlined } from "@material-ui/icons";
import FilterComponent from "./Filter";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://i.ibb.co/0nQJv76/Whats-App-Image-2023-09-04-at-06-30-01.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: theme.palette.common.white,
    padding: theme.spacing(10, 0),
  },
  ctaContainer: {
    background: "rgba(255, 255, 255, 0.9)", // Slightly transparent white background
    padding: theme.spacing(8),
    borderRadius: theme.spacing(3), // Increased border radius
    boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)", // More prominent shadow
  },
  ctaButton: {
    marginTop: theme.spacing(3),
    backgroundColor: "transparent", // Make the button transparent
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`, // Add border
    borderRadius: theme.spacing(2), // Increase border radius
    transition: "background-color 0.3s ease, color 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  ctaTextField: {
    marginBottom: theme.spacing(2),
  },
}));

const Hero = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.heroContainer} height={{ xs: "85vh", md: "auto" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box
              textAlign={{ xs: "center", md: "left" }}
              display={{ xs: "flex", md: "block" }}
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Stack direction="row" spacing={2} alignItems="center" mb={4}>
                <HomeOutlined />
                <Typography variant="h6" color="primary.main">
                  Welcome To Romax
                </Typography>
                <HomeOutlined />
              </Stack>
              <Typography
                variant="h5"
                fontSize={{ xs: "45px", md: "52px" }}
                mb={4}
              >
                Find Your Dream, Suitable & Comfortable Home.
              </Typography>
              <Typography
                variant="h6"
                letterSpacing="3px"
                lineHeight={1.3}
                mb={4}
                color="#e3e1e1"
              >
                Discover your dream home with us. Browse our listings and find
                the perfect property for you.
              </Typography>
              <Button
                onClick={() => navigate("/products")}
                sx={{
                  textTransform: "none",
                  bgcolor: "teal",
                  color: "white",
                  paddingX: "30px",
                  paddingY: "15px",
                  // alignSelf: "start",
                  display: "inline-flex",
                  gap: "5px",
                  borderRadius: "30px",
                  marginTop: '25px',
                  "&:hover": {
                    backgroundColor: "#119595",
                  },
                }}
              >
                <ChevronRight />
                <Typography variant="body2" fontSize="17px" letterSpacing="1px">
                  {" "}
                  Discover More
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display={{ xs: "none", md: "block" }}
            sx={{}}
          >
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingY: 3.5,
                paddingX: 3,
                borderRadius: "10px",
                boxShadow: "rgb(161, 161, 172) 0px 2px 6px",
                border: "2px solid rgb(113, 113, 132)",
                // width: "70%",
                marginTop: "-40px",
              }}
            >
              
              <FilterComponent />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
