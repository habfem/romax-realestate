import { useState } from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
  const [mainSliderRef, setMainSliderRef] = useState(null);
  const [thumbnailSliderRef, setThumbnailSliderRef] = useState(null);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: thumbnailSliderRef,
  };

  const thumbnailSettings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: images?.length < 4 ? images?.length : 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: mainSliderRef,
  };
  return (
    <div>
      <Slider {...settings} ref={(slider) => setMainSliderRef(slider)}>
        {images?.map((image, index) => (
          <div key={index} className="bookingMainCauImage ">
            <img src={image} alt="house" className="descCarouselImage" />
          </div>
        ))}
      </Slider>
      <Box
        mt={2}
        sx={{
          cursor: "pointer",
        }}
      >
        <Slider
          {...thumbnailSettings}
          ref={(slider) => setThumbnailSliderRef(slider)}
        >
          {images?.map((image, index) => (
            <div key={index} className="descCarouselImageBox">
              <img src={image} alt="house" className="descCarouselImage" />
            </div>
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default Carousel;
