import React from "react";
import {
  Box,
  Stack,
  IconButton,
  Typography,
  Tooltip,
  AppBar,
  Toolbar,
  useMediaQuery
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "@material-ui/icons";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { logout } from "../../redux/userRedux";

const TopBar = ({ handleDrawerOpen }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const bigScreen = useMediaQuery("(min-width:968px)");
  const user = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF80",
        boxShadow: "none",
        zIndex: 20,
        height: "60px" // Adjust the height of the AppBar
      }}
    >
      <Toolbar disableGutters sx={{ height: "100%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
          <IconButton
            onClick={handleDrawerOpen}
            sx={{
              background: "#F6F9FC",
              display: bigScreen ? "none" : "inline-flex"
            }}
          >
            <Menu />
          </IconButton>

          <Link
            to="/"
            style={{
              textDecoration: "none",
              height: "100%",
              paddingLeft: "25px",
              paddingRight: "25px",
            }}
          >
            <Box sx={{ height: "100%" }}>
              <img
                src="https://static.wixstatic.com/media/38c36f_cf2679a5ddd4403fa15dda614149c8f9~mv2.png/v1/fill/w_187,h_113,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PHOTO-2021-09-15-13-59-41_edited.png"
                alt="Romax Properties Ltd Logo"
                style={{
                  height: isNonMobile ? "45px" : "30px", // Adjust the height of the logo
                  maxHeight: "100%" // Ensure the logo does not exceed the height of the AppBar
                }}
              />
            </Box>
          </Link>

          {user && (
            <Stack direction="row" spacing={{ sm: 1.5 }} alignItems="center">
              <Typography>Hi, {user.username}</Typography>
              <Tooltip title="Logout">
                <IconButton onClick={handleLogout}>
                  <PowerSettingsNewIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;