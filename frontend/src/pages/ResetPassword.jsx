import React, { useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Paper,
  TextField,
  Rating,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import makeToast from "../toaster";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    borderRadius: "10px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
});

const ResetPassword = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleReset = async (password) => {
    setLoading(true)
    try {
      await publicRequest.post(`/auth/reset-password/${token}`, { password });
      setLoading(false)
      makeToast(
        "success",
        "Password reset was sucessful"
      );
      navigate("/login")
    } catch (error) {
      setLoading(false)
      makeToast("error", error.response.data.message);
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#F6F9FC",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          borderRadius: "10px",
          width: isNonMobile ? "500px" : "95%",
          padding: isNonMobile ? "2rem 3rem" : "2rem 1.5rem",
          boxShadow: "rgba(3, 0, 71, 0.09) 0px 8px 45px",
        }}
      >
        <Formik
          onSubmit={(values, { resetForm }) => {
              handleReset(values.password)
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

                Reset your Password
              </Typography>

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
                disabled={!isValid || loading || !dirty}
                type="submit"
                sx={{
                  textTransform: "none",
                  bgcolor: "primary.main",
                  color: "white",
                  fontSize: "14px",
                  paddingY: "13px",
                  fontWeight: 600,
                  width: "100%",
                  marginTop: "20px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#fc973f",
                  },
                }}
              >
                Reset
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

const userSchema = yup.object().shape({
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
  password: "",
  confirmPassword: "",
};

export default ResetPassword;
