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
  },
}));

const Hero = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.heroContainer} padding={{xs:"100px 0", sm:"80px 0"}}>
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
                fontSize={{ xs: "40px", md: "52px" }}
                mb={4}
              >
                Find Your Dream, Suitable & Comfortable Home.
              </Typography>
              <Typography
                variant="h6"
                letterSpacing="3px"
                lineHeight={1.3}
                fontSize={{ xs: "16px", sm: "20px" }}
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
                  bgcolor: "primary.main",
                  color: "white",
                  paddingX: "30px",
                  paddingY: "15px",
                  // alignSelf: "start",
                  display: "inline-flex",
                  gap: "5px",
                  borderRadius: "30px",
                  marginTop: "25px",
                  "&:hover": {
                    backgroundColor: "#fc973f",
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
