import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { publicRequest } from "../requestMethods";
import Card from "./Card";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "-5px",
        background: "teal",
        color: "white",
        "&:hover": {
          background: "teal",
        },
      }}
    >
      <ArrowForward
        sx={{
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    </IconButton>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "-5px",
        zIndex: 10,
        background: "teal",
        color: "white",
        "&:hover": {
          background: "teal",
        },
      }}
    >
      <ArrowBack
        sx={{
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    </IconButton>
  );
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get(`/products`);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <Box width={{ xs: "97%", md:"80%" }}margin="0 auto" pb={3}>
      <Typography variant="h5" textAlign="center" fontSize="28px" mb={2}>
        FEATURED HOUSES
      </Typography>
      <div>
        <Slider {...settings}>
          {products.map((item, index) => (
            <div key={index} className="carousel-card">
              <Card {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default Products;
