import React from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  styled,
  Typography,
  Button,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {
      borderColor: "#4e97fd",
    },
  },
});

export default function User() {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const user = useSelector((state) =>
    state.users.users.find((users) => users._id === userId)
  );

  return (
    <Box px={{ xs: 2, md: 4 }} style={{ width: "80%", height: "100vh" }}>
      <Stack spacing={3}>
        <Stack
          justifyContent="space-between"
          direction={{ xs: "column", sm: "row" }}
          rowGap={{ xs: 2, sm: 0 }}
        >
          <Typography variant="h6" fontSize={{ xs: "19px", sm: "21px" }}>
            Edit User
          </Typography>
          <Link to="/user/newuser">
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#4e97fd",
                color: "white",
                fontSize: "16px",
                paddingX: "15px",
                fontWeight: 600,
                paddingY: "10px",
                alignSelf: isNonMobile ? "start" : "stretch",
                borderRadius: "10px",
                alignItems: "center",
                width: isNonMobile ? "auto" : "100%",
                gap: 1,

                "&:hover": {
                  backgroundColor: "#2756b6",
                },
              }}
            >
              Create
            </Button>
          </Link>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <form>
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Username"
              defaultValue={user.username}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="First Name"
              defaultValue={user.firstName}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Last Name"
              defaultValue={user.lastName}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Email"
              defaultValue={user.email}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="password"
              label="Password"
              defaultValue={user.password}
            />
            <br />
            <br />
            <Button
              type="submit"
              sx={{
                textTransform: "none",
                bgcolor: "#4e97fd",
                color: "white",
                fontSize: "16px",
                paddingX: "25px",
                fontWeight: 600,
                paddingY: "5px",
                alignSelf: "start",
                borderRadius: "8px",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#2756b6",
                },
              }}
            >
              Update
            </Button>
          </form>
        </Paper>
      </Stack>
    </Box>
  );
}
