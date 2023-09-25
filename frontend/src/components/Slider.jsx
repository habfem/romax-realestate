import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { sliderItems } from "../data"
import { mobile, mobileXR, tablet, ipad } from "../responsive"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ height: "180px" })};
  ${mobileXR({ height: "225px" })};
  ${tablet({ height: "350px" })};
  ${ipad({ height: "400px" })};
`

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.direction === "left" && "10px"};
  right: ${props => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.4;
  z-index: 2;
  ${mobile({ height: "10px", width: "10px" })};
  ${mobileXR({ height: "20px", width: "20px" })};
  ${tablet({ height: "40px", width: "40px" })};
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${props => props.slideIndex * -100}vw);
`

const Slide = styled.div`
  width: 100vw;
  height:  100vh;
  display: flex;
  align-items: center;
  background-color: #${props => props.bg};
  ${mobile({ height: "175px" })};
  ${mobileXR({ height: "220px" })};
  ${tablet({ height: "350px" })};
  ${ipad({ height: "400px" })};
`

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`

const Image = styled.img`
  height: 80%;
  ${mobile({ height: "150px" })};
  ${mobileXR({ height: "180px" })};
  ${tablet({ height: "270px" })};
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`

const Title = styled.h1`
  font-size: 70px;
  ${mobile({ fontSize: "10px" })};
  ${mobileXR({ fontSize: "12px" })};
  ${tablet({ fontSize: "20px" })};
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
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  ${mobile({ fontSize: "6px" })};
  ${mobileXR({ fontSize: "7px" })};
  ${tablet({ fontSize: "8px" })};
`

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  const estate = () => {
    navigate("/estate")
  }

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) =>
        prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0
      );
    }, 8000); // 8000 milliseconds = 8 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item
            .id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button onClick={estate}>OUR ESTATES</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  )
}

export default Slider                                                                                                                                                                        
