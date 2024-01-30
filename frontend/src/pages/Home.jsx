import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Carousel from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Facilities from "../components/Facilities";
import { resetState } from "../redux/filter";
import { useDispatch } from "react-redux";
import { Paper, Box } from "@mui/material";
import FilterComponent from "../components/Filter";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
  }, []);
  return (
    <div>
      <Announcement />
      <Navbar />
      <Hero />
      <Box display={{ xs: "block", md: "none" }} paddingX={1}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingY: 3.5,
            paddingX: 3,
            borderRadius: "10px",
            boxShadow: "rgb(161, 161, 172) 0px 2px 6px",
           
            marginTop: "20px",
          }}
        >
          <FilterComponent />
        </Paper>
      </Box>

      <Categories />
      <Carousel />
      <br />
      <Products />
      <br />
      <Facilities />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
