import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Stack,
  Paper,
  Avatar,
  Grid,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Header from "./Header";
import { useSelector } from "react-redux";

const Profile = ({ openDrawer }) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const Mobile = useMediaQuery("(min-width:600px)");
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Stack spacing={3}>
      <Header
        Icon={PersonIcon}
        title={"My Profile"}
        openDrawer={openDrawer}
        button="Edit Profile"
        link={`/user/profile/${user?._id}`}
      />
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              paddingY: 2,
              paddingX: Mobile ? 3 : 1.5,
              bgcolor: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                alt="profile-picture"
                src={user?.image || ""}
                sx={{ width: 64, height: 64 }}
              />
              <Typography
                color="rgb(125, 135, 156)"
                letterSpacing={4}
                textTransform="uppercase"
              >
                {user?.username}
              </Typography>
            </Stack>
            {/* <Typography color="rgb(125, 135, 156)" letterSpacing={4}>
              SILVER USER
            </Typography> */}
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm={2}
          sx={{
            marginTop: Mobile ? 0 : 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              paddingY: 2,
              paddingX: 4,
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography color="primary.main" variant="h6">
              0
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize="12px"
              textAlign="center"
              color="rgb(125, 135, 156)"
            >
              All Bookings
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          paddingY: 2,
          paddingX: Mobile ? 3 : 1.5,

          display: "flex",
          bgcolor: "white",
          flexDirection: isNonMobile ? "row" : "column",
        }}
      >
        <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <small
            style={{
              color: "rgb(125, 135, 156)",
            }}
          >
            First Name
          </small>
          <Typography variant="subtitle2" textTransform="capitalize">
            {user?.firstName}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <small
            style={{
              color: "rgb(125, 135, 156)",
            }}
          >
            Last Name
          </small>
          <Typography variant="subtitle2" textTransform="capitalize">
            {user?.lastName}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <small
            style={{
              color: "rgb(125, 135, 156)",
            }}
          >
            Email
          </small>
          <Typography variant="subtitle2">{user?.email}</Typography>
        </Box>
        {/* <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <small
            style={{
              color: "rgb(125, 135, 156)",
            }}
          >
            Phone
          </small>
          <Typography variant="subtitle2">{user?.phone}</Typography>
        </Box> */}
        {/* <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <small
            style={{
              color: "rgb(125, 135, 156)",
            }}
          >
            Birth Date
          </small>
          <Typography variant="subtitle2">
            {" "}
            {user?.dob &&
              new Date(user.dob).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
          </Typography>
        </Box> */}
      </Paper>
    </Stack>
  );
};

export default Profile;
