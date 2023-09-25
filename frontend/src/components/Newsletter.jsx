import { Send } from "@material-ui/icons"
import styled from "styled-components"
import { mobile, mobileXR, tablet } from "../responsive";

const Container = styled.div`
  height: 50vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "70px" })};
  ${mobileXR({ fontSize: "60px" })};
  ${tablet({ fontSize: "55px" })};
`
const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })};
  ${mobileXR({ textAlign: "center" })};
  ${tablet({ textAlign: "center" })};
`
const InputContainer = styled.div`
  width: 50%;
  height: 40px
  background-color: white;
  display: flex;
  jstify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })};
  ${mobileXR({ width: "80%" })};
  ${tablet({ width: "80%" })};
`
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`
const Button = styled.button`
  flex: 1;
  cursor: pointer;
  border: none;
  background-color: teal;
  color: white;
`

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get updates on our latest properties. </Desc>
      <InputContainer>
        <Input placeholder="Enter your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  )
}

export default Newsletter