import { useState } from "react";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
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

const ForgotPassword = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (input) => {
    // Use a regular expression to validate the email format.
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(input);
  };

  const handleSubmit = async () => {
    if (isValidEmail(email)) {
      setLoading(true);
    try {
      await publicRequest.post(`/auth/forgot-password`, { email });
      makeToast(
        "success",
        "Password reset link sent successfully to your email"
      );
      setLoading(false);
      setEmail("");
    } catch (error) {
      setLoading(false);
      makeToast("error", error.response.data.message);
      console.log(error);
    }
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
        <form>
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

            Forgot Password?
          </Typography>
          <Typography mb={4} textAlign="center">
            Enter your email to reset password.
          </Typography>

          <CustomTextField
            fullWidth
            variant="outlined"
            type="email"
            label="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            onClick={handleSubmit}
            disabled={loading || !email || !isValidEmail(email)}
            sx={{
              textTransform: "none",
              bgcolor: "primary.main",
              color: "white",
              fontSize: "16px",
              paddingY: "13px",
              fontWeight: 600,
              width: "100%",
              marginTop: "30px",
              borderRadius: "10px",

              "&:hover": {
                backgroundColor: "#fc973f",
              },
            }}
          >
            Submit
          </Button>
        </form>
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
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
