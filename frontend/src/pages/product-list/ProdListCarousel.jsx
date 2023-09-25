import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousel = ({images}) => {
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
          color: "white",
        }}
      >
        <ChevronRightIcon
          sx={{
            cursor: "pointer",
            fontSize: "45px",
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
          color: "white",
        }}
      >
        <ChevronLeftIcon
          sx={{
            cursor: "pointer",
            fontSize: "45px",
          }}
        />
      </IconButton>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <Slider className="sliderr" {...settings}>
      {images.map((item, index) => (
        <div key={index} className="image-box">
          <img className="listCarouselImage" src={item} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
