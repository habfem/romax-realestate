import {
  //Facebook, 
  //Instagram, 
  MailOutline,
  Phone,
  //Pinterest, 
  Room,
  //Twitter 
} from "@material-ui/icons"
import styled from "styled-components"
import { mobile, mobileXR, tablet } from "../responsive"
import {
  Box
} from "@mui/material";
import logo from "../assests/Logo - Orange Background.png";

const Container = styled.div`
  background-color: #ee7e19;
  display: flex;
  ${mobile({ flexDirection: "column" })};
  ${mobileXR({ flexDirection: "column" })};
  ${tablet({ flexDirection: "column" })};
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;

  img {
    max-width: auto;
    height: auto;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    img {
      max-height: 150px;
      max-width: 250px; 
    }
  }
  background-color: #ee7e19;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
/* const Logo = styled.h1`
  display: flex;
`
const Desc = styled.p`
  margin: 20px;
`
const SocialContainer = styled.div`
  display: flex;
`
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
` */
const Center = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ee7e19;
  ${mobile({ dsiplay: "none" })};
  ${mobileXR({ dsiplay: "none" })};
  ${tablet({ dsiplay: "none" })};
`
const Title = styled.h3`
  margin-bottom: 30px;
  background-color: #ee7e19;
`
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  background-color: #ee7e19;
`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
<<<<<<< HEAD
  background-color: #eb8510;
=======
  background-color: #ee7e19;
>>>>>>> 5c65ff5730875f690d0fb6bbbdf10fac35088ad3
`
const Right = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ee7e19;
  ${mobile({ backgroundColor: "#fff8f8" })};
  ${mobileXR({ backgroundColor: "#fff8f8", height: "100%" })};
  ${tablet({ backgroundColor: "#fff8f8", height: "100%" })};
`
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  background-color: #ee7e19;
`

/* const Payment = styled.img`
  width: 50%;
` */

const Footer = () => {
  return (
    <Container style={{ backgroundColor: "#ee7e19" }}>
      <Left>
        <Box height={{ xs: "120px", sm: "140px" }} >
          <img
            src={logo}
            alt="Romax Properties Ltd Logo"
            style={{
              backgroundColor: "#ee7e19",
              height: "200px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        {/* <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nobis architecto suscipit deserunt totam reiciendis illum dolorum numquam corporis nostrum.
        </Desc> */}
        {/* <SocialContainer>
          <SocialIcon color="3B5999">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer> */}
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order</ListItem>
          <ListItem>My Estate</ListItem>
          <ListItem>Properties</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right style={{ backgroundColor: "#ee7e19" }}>
        <Title>Contact</Title>
        <ContactItem><Room style={{ marginRight: "10px" }} /> 622 Dixie Path, South Tobinchester 98336</ContactItem>
        <ContactItem><Phone style={{ marginRight: "10px" }} /> + (234) - 913 - 396 - 8613</ContactItem>
        <ContactItem><MailOutline style={{ marginRight: "10px" }} /> contact@sell.dev</ContactItem>
        {/* <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> */}
      </Right>
    </Container>
  )
}

export default Footer