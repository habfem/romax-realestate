import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Container,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Person, Menu as MenuIcon } from "@material-ui/icons";
import { Logout, Login } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { Link, useNavigate } from "react-router-dom";

const MobileNavBar = ({ openDrawer }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Box display={{ xs: "block", md: "none" }}>
      <Stack direction="row">
        <div>
          <IconButton onClick={handleClick}>
            <Person />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              marginTop: "10px",
              "& .MuiList-root": {
                width: "200px",
              },
            }}
          >
            <Link
              to="/user/profile"
              style={{
                textDecoration: "none",
                color: "#2b3445",
              }}
            >
              {user && (
                <MenuItem onClick={handleClose}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Person fontSize="small" />
                    <Typography>My Dashbord</Typography>
                  </Stack>
                </MenuItem>
              )}
            </Link>

            {user ? (
              <MenuItem onClick={handleLogout}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Logout fontSize="small" />
                  <Typography>Logout</Typography>
                </Stack>{" "}
              </MenuItem>
            ) : (
              <MenuItem onClick={() => navigate("/login")}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Login fontSize="small" />
                  <Typography>Login</Typography>
                </Stack>{" "}
              </MenuItem>
            )}
          </Menu>
        </div>
        <IconButton onClick={openDrawer}>
          <MenuIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default MobileNavBar;
