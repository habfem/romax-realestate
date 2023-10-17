import { useNavigate } from "react-router-dom";
import { sliderItems } from "../data";
import { Box, Grid, Stack, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { OtherHousesOutlined } from "@mui/icons-material";

const Card = ({ title, img, desc, bg }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        cursor: "pointer",
        borderRadius: "8px",
      }}
    >
      <Grid
        container
        sx={{
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={6} height="500px">
          <img
            src={img}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} order={{ xs: 1, sm: 0 }} alignSelf="stretch">
          <Stack
            spacing={2.5}
            bgcolor={bg}
            height="100%"
            p={{ xs:4, sm:3}}
            justifyContent="center"
          >
            <Typography
              variant={"h5"}
              lineHeight="1.4"
              fontSize={{ sm: "25px", md: "40px" }}
              letterSpacing="3.5px"
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              letterSpacing="1px"
              color="#7D879C"
            >
              {desc}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate("/estate")}
              sx={{
                textTransform: "none",
                // bgcolor: "teal",
                color: "#2b3445",
                paddingX: "30px",
                paddingY: "15px",
                alignSelf: "start",
                display: "flex",
                gap: "5px",
                borderRadius: "10px",
                borderColor: "#2b3445",
                borderWidth: "2px",
                "&:hover": {
                  color: "#FFFFFF",
                  bgcolor: "#2b3445",
                },
              }}
            >
              <OtherHousesOutlined />
              <Typography variant="body2" fontSize="17px" letterSpacing="1px">
                {" "}
                OUR ESTATE
              </Typography>
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const Carousel = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  
  return (
    <Box py={5}>
      <Slider {...settings}>
        {sliderItems.map((item) => (
          <Card {...item} />
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
