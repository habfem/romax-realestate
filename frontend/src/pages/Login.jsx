import { useState, useEffect } from "react";
import styled from "styled-components"
import { mobile, mobileXR, tablet } from "../responsive";
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, { username, password });
  };

  const handleRegister = () => {
    navigate("/signup")
  }

  const handleReset = () => {
    navigate("/reset")
  }

  useEffect(() => {
    // Set the error display to true when an error occurs
    if (error) {
      setShowError(true);

      // Use setTimeout to hide the error message after 5 seconds
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 3000);

      // Clear the timeout when the component unmounts or the error changes
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)} />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)} />

          <Button onClick={handleClick} disabled={isFetching}>LOG IN</Button>
          {showError && <Error>Wrong Credentials...</Error>}
          <Link onClick={handleReset}>DO NOT REMEMBER YOUR PASSWORD?</Link>
          <Link onClick={handleRegister}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fstatic-christiesrealestate-cms-production.gtsstatic.net%2Fresources%2Fv_4_19_0_380%2Fsiteresources%2Fmy%20folder%2Fresponsive%2Flifestyles%2Fbeach%2Fcarousel%2Fvilla%20baan%20sang.jpg&option=N&permitphotoenlargement=false&w=1200&fallbackimageurl=https%3A%2F%2Fstatic-christiesrealestate-cms-production.gtsstatic.net%2Fresources%2Fv_4_19_0_380%2Flayouts%2Fcommon%2Fimages%2Fno-photo.jpg")
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
  &:disabled{
    color: green;
    cursor: not-allowed;
  }
`

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`

const Error = styled.span`
  color: red;
`;

export default Login                                