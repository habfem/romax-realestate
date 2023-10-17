
import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Paper,
  TextField,
  styled,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/apiCalls";
import { resetState } from "../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import makeToast from "../toaster";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    height: "45px",
    borderRadius: "10px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
});

const Signup = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isRegistering, error, registerFlag } = useSelector(
    (state) => state.user
  );

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // const auth = useSelector((state) => state.auth);
  // const { isSuccess, message, isError, isLoading, user, loggedFlag } = auth;
  const navigate = useNavigate();
  const resetFormRef = useRef();

  useEffect(() => {
    if (registerFlag) {
      makeToast("success", "Signing up was Sucessful!");
      dispatch(resetState());
      resetFormRef.current();
      navigate("/login");
    }
    if (error) {
      makeToast("error", "Something went wrong, Please try again");
      dispatch(resetState());
    }
  }, [error, registerFlag, dispatch, isRegistering]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#F6F9FC",
        py: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          bgcolor: "white",
          borderRadius: "10px",
          width: isNonMobile ? "500px" : "95%",
          padding: isNonMobile ? "2rem 3rem" : "2rem 2rem",
        }}
      >
        <Formik
          onSubmit={(values, { resetForm }) => {
            const { confirmPassword, ...updatedValues } = values;
            register(dispatch, updatedValues);
            resetFormRef.current = resetForm;
          }}
          initialValues={initialValues}
          validationSchema={userSchema}
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
                <Typography
                  variant="h5"
                  letterSpacing="2px"
                  color="teal"
                  textAlign="center"
                >
                  Romax
                </Typography>
              </Link>
              <Typography variant="body2" mt={1} mb={4} textAlign="center">
                Create Your Account
              </Typography>
              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  fontSize="12px"
                  color="#4b566b"
                  mb={1.5}
                >
                  First Name
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder="Alakija Vincent"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
              </Box>
              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  fontSize="12px"
                  color="#4b566b"
                  mb={1.5}
                >
                  Last Name
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder="Vincent"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
              </Box>
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
                  placeholder="Vincent01"
                  size="small"
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
                  Email
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  placeholder="maria@romax.com"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
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
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        sx={{ padding: 0, marginRight: "10px" }}
                      >
                        {showPassword ? (
                          <Visibility
                            sx={{
                              fontSize: "20px",
                            }}
                          />
                        ) : (
                          <VisibilityOff
                            sx={{
                              fontSize: "20px",
                              color: "#DAE1E7",
                            }}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  fontSize="12px"
                  color="#4b566b"
                  mb={1.5}
                >
                  Confirm Password
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="*********"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleToggleConfirmPassword}
                        edge="end"
                        sx={{ padding: 0, marginRight: "10px" }}
                      >
                        {showConfirmPassword ? (
                          <Visibility
                            sx={{
                              fontSize: "20px",
                            }}
                          />
                        ) : (
                          <VisibilityOff
                            sx={{
                              fontSize: "20px",
                              color: "#DAE1E7",
                            }}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Button
                type="submit"
                disabled={!isValid || !dirty || isRegistering}
                sx={{
                  textTransform: "none",
                  bgcolor:
                    !isValid || !dirty || isRegistering
                      ? "#0000001f !important"
                      : "primary.main",
                  color: "white",
                  fontSize: "14px",
                  paddingY: "10px",
                  fontWeight: 600,
                  width: "100%",
                  marginTop: "20px",
                  borderRadius: "10px",

                  "&:hover": {
                    backgroundColor: "#E3364E",
                  },
                }}
              >
                Create Account
              </Button>
            </form>
          )}
        </Formik>

        <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
          <Typography variant="subtitle2">Already have an account?</Typography>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              color="#2b3445"
              sx={{
                borderBottom: "1.5px solid #2b3445",
              }}
            >
              Login
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  username: yup.string().required("required"),
  password: yup
    .string()
    .required("required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least 8 characters, including letters and numbers"
    ),
  confirmPassword: yup
    .string()
    .required("required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export default Signup;
