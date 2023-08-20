import React from 'react';
import styled from "styled-components"
import { mobile, mobileXR, tablet } from "../responsive"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://revenuesandprofits.com/wp-content/uploads/2023/06/Types-Of-Property-Investment.jpg")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: rgba(255,255,255,0.5);
  ${mobile({ width: "75%" })};
  ${mobileXR({ width: "75%" })};
  ${tablet({ width: "75%" })};
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Title = styled.h1`
  font-size: 24px;
  fontweight: 300;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`

const Reset = () => {

  return (
    <Container>
      <Wrapper>
        <Title>RESET PASSWORD</Title>
        <Form>
          <Input placeholder="email" />
          <Button>SEND</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Reset