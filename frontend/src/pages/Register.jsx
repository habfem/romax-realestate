import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { mobile, mobileXR, tablet } from "../responsive";
import { register } from '../redux/apiCalls';
import { registerFailure } from '../redux/userRedux';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F236i215%2Fpzdcph02xhscm9ee1d9wa5e7t4i215&option=N&h=472&permitphotoenlargement=false")
   center;
   background-size: cover;
   display: flex;
   align-items: center;
   justify-content: center;
`
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: rgba(255,255,255,0.5);
  ${mobile({ width: "75%", height: "100%" })};
  ${mobileXR({ width: "75%", height: "100%" })};
  ${tablet({ width: "75%", height: "100%" })};
`
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`
const Title = styled.h1`
  font-size: 24px;
  fontweight: 300;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background: teal;
  color: white;
  cursor: pointer;
  ${mobile({ width: "100%" })};
  ${mobileXR({ width: "100%" })};
  ${tablet({ width: "100%" })};
`

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRegistering, error } = useSelector((state) => state.user);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      dispatch(registerFailure());
      return error;
    }

    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    register(dispatch, newUser);
    navigate("/login")
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="first name" onChange={(e) => setFirstName(e.target.value)} />
          <Input placeholder="last name" onChange={(e) => setLastName(e.target.value)} />
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister} disabled={isRegistering}>CREATE ACCOUNT</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;