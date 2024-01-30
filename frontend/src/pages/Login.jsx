import { useEffect, useRef, useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  Paper,
  TextField,
  styled,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../toaster";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Close } from "@mui/icons-material";
import { login } from "../redux/apiCalls";
import { resetState } from "../redux/userRedux";
//import logo from "../assests/Logo-Transparent.png";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    // height: "45px",
    borderRadius: "10px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
});
const Login = ({ bgcolor, handleClose }) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const { isFetching, error, currentUser, errorMessage } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      makeToast("success", "Login Sucessful!");
      if (location.pathname === "/login") {
        navigate("/");
      }
      handleClose();
    }

    if (error) {
      makeToast("error", errorMessage);
      dispatch(resetState());
    }
  }, [isFetching, error, currentUser, handleClose]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        bgcolor,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          bgcolor: "white",
          borderRadius: "10px",
          width: isNonMobile ? "500px" : "95%",
          padding: isNonMobile ? "2rem 3rem" : "2rem 1.5rem",
          position: "relative",
          // boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
        }}
      >
        {handleClose && (
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            <Close />
          </IconButton>
        )}
        <Formik
          onSubmit={(values, { resetForm }) => {
            const { username, password } = values;
            login(dispatch, { username, password });
          }}
          initialValues={initialValues}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Box>
                  <img
                    src="https://static.wixstatic.com/media/38c36f_cf2679a5ddd4403fa15dda614149c8f9~mv2.png/v1/fill/w_187,h_113,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PHOTO-2021-09-15-13-59-41_edited.png"
                    alt="Romax Properties Ltd Logo"
                    style={{
                      margin: "0 auto",
                      display: "block",

                    }}
                  />
                </Box>
              </Link>

              <Typography variant="body2" mt={1} mb={4} textAlign="center" letterSpacing="1px" fontSize="17px">
                Welcome To Romax
              </Typography>

              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  fontSize="12px"
                  color="#4b566b"
                  mb={1.5}
                >
                  Username
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder="JohnDoe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
              </Box>
              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  fontSize="12px"
                  color="#4b566b"
                  mb={1.5}
                >
                  Password
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  placeholder="*********"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Button
                type="submit"
                disabled={!isValid || !dirty || isFetching}
                sx={{
                  textTransform: "none",

                  bgcolor:
                    !isValid || !dirty || isFetching
                      ? "#0000001f !important"
                      : "primary.main",
                  color: "white",
                  fontSize: "16px",
                  paddingY: "13px",
                  fontWeight: 600,
                  width: "100%",
                  marginTop: "10px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#fc973f",
                  },
                }}
              >
                Login
              </Button>
            </form>
          )}
        </Formik>

        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
          <Typography variant="subtitle2">Don't have account?</Typography>
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              color="#2b3445"
              sx={{
                borderBottom: "1.5px solid #2b3445",
              }}
            >
              Sign Up
            </Typography>
          </Link>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          mt={3}
          sx={{
            bgcolor: "#f3f5f9",
            paddingY: "20px",
            borderRadius: "10px",
          }}
        >
          <Typography variant="subtitle2">Forgot your password?</Typography>
          <Link to={"/forgot-password"} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              color="#2b3445"
              sx={{
                borderBottom: "1.5px solid #2b3445",
              }}
            >
              Reset It
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  username: "",
  password: "",
};
export default Login;
