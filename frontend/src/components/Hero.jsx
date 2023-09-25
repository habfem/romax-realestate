import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Container, Grid, Paper, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { mobile, mobileXR, tablet } from "../responsive";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://i.ibb.co/0nQJv76/Whats-App-Image-2023-09-04-at-06-30-01.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: theme.palette.common.white,
    padding: theme.spacing(10, 0),
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
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

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  ${mobile({ fontSize: "6px" })};
  ${mobileXR({ fontSize: "7px" })};
  ${tablet({ fontSize: "8px" })};
`
const Title = styled.h1`
  font-size: 55px;
  ${mobile({ fontSize: "10px" })};
  ${mobileXR({ fontSize: "12px" })};
  ${tablet({ fontSize: "20px" })};
`
const Titled = styled.h1`
  font-size: 30px;
  ${mobile({ fontSize: "10px" })};
  ${mobileXR({ fontSize: "12px" })};
  ${tablet({ fontSize: "15px" })};
`
const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({ display: "none" })};
  ${mobileXR({ display: "none" })};
  ${tablet({ fontSize: "9px" })};
`

const Hero = () => {
  const [place, setPlace] = useState("ikoyi");
  const [priceRange, setPriceRange] = useState("0");
  const [bed, setBed] = useState("0");

  const classes = useStyles();
  const navigate = useNavigate();

  const propertiesList = () => {
    navigate('/products/search')
  }

  const propertiesFiltered = () => {
    navigate(`/products?place=${place}&bed=${bed}&priceRange=${priceRange}`)
  }

  return (
    <div className={classes.heroContainer}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div className={classes.heroContent}>
              <Title>
                Welcome to Romax Properties
              </Title>
              <Desc variant="h5" paragraph>
                Discover your dream home with us. Browse our listings and find the perfect property for you.
              </Desc>
              <Button variant="contained" color="primary" className={classes.ctaButton} onClick={propertiesList}>
                Quick Search
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.ctaContainer}>
              <Titled>
                Filter Properties
              </Titled>
              <FormControl fullWidth variant="outlined" className={classes.ctaTextField}>
                <InputLabel>Price Range</InputLabel>
                <Select onChange={(e) => setPriceRange(e.target.value)}>
                  <MenuItem value="0">₦0 - ₦20,000,000</MenuItem>
                  <MenuItem value="1">₦20,000,000 - ₦50,000,000</MenuItem>
                  <MenuItem value="2">₦50,000,000 - ₦70,000,000</MenuItem>
                  <MenuItem value="3">₦70,000,000 - ₦100,000,000</MenuItem>
                  <MenuItem value="4">₦100,000,000 and up</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" className={classes.ctaTextField}>
                <InputLabel>Location</InputLabel>
                <Select onChange={(e) => setPlace(e.target.value)}>
                  <MenuItem value="ikoyi">Ikoyi</MenuItem>
                  <MenuItem value="ikeja">Ikeja</MenuItem>
                  <MenuItem value="london">London</MenuItem>
                  <MenuItem value="abuja">Abuja</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" className={classes.ctaTextField}>
                <InputLabel>Number of Beds</InputLabel>
                <Select onChange={(e) => setBed(e.target.value)}>
                  <MenuItem value="0">1</MenuItem>
                  <MenuItem value="1">2</MenuItem>
                  <MenuItem value="2">3</MenuItem>
                  <MenuItem value="3">4</MenuItem>
                  <MenuItem value="4">5</MenuItem>
                  <MenuItem value="5">6</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" className={classes.ctaButton} onClick={propertiesFiltered}>
                Search
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Hero;
