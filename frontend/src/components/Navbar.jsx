import React, { useState } from "react";
import styled from "styled-components";
import { Search } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { Typography, Stack, Container, Button, Drawer } from "@mui/material";
import NavBarDrawer from "./NavBarDrawer";
import MobileNavBar from "./MobileNavBar";

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={{ xs: 1.8, md: 2.5 }}
        sx={{
          // boxShadow: "rgb(161, 161, 172) 0px 2px 6px",
          // borderColor: "rgb(113, 113, 132)",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography variant="h5" letterSpacing="3px" color="teal">
            ROMAX
          </Typography>
        </Link>

        <MobileNavBar openDrawer={openDrawer} />
        <Stack
          direction="row"
          spacing={3.5}
          display={{ xs: "none", md: "flex" }}
        >
          <Link
            to="/products"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              color="#2b3445"
              variant="body2"
              sx={{
                "&:hover": {
                  color: "teal",
                },
              }}
            >
              House Prices
            </Typography>
          </Link>
          <Link
            to="/estate"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              color="#2b3445"
              variant="body2"
              sx={{
                "&:hover": {
                  color: "teal",
                },
              }}
            >
              Estate Prices
            </Typography>
          </Link>
          <Link
            to="/about"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              color="#2b3445"
              variant="body2"
              sx={{
                "&:hover": {
                  color: "teal",
                },
              }}
            >
              Our Timeline
            </Typography>
          </Link>
          <Link
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              color="#2b3445"
              variant="body2"
              sx={{
                "&:hover": {
                  color: "teal",
                },
              }}
            >
              Instant Valuation
            </Typography>
          </Link>
        </Stack>

        <Stack
          direction="row"
          spacing={3.5}
          alignItems="center"
          display={{ xs: "none", md: "flex" }}
        >
          {user && (
            <Link
              to="/user/profile"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                color="#2b3445"
                variant="body2"
                sx={{
                  "&:hover": {
                    color: "teal",
                  },
                }}
              >
                {`Hi,${user.username}`}
              </Typography>
            </Link>
          )}
          <Link
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              color="#2b3445"
              variant="body2"
              sx={{
                "&:hover": {
                  color: "teal",
                },
              }}
            >
              Saved
            </Typography>
          </Link>
          {user ? (
            <Button
              onClick={handleLogout}
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "teal",

                borderRadius: "8px",
                borderColor: "teal",
                borderWidth: "2px",
                "&:hover": {
                  color: "#FFFFFF",
                  bgcolor: "teal",
                },
              }}
            >
              <Typography variant="body2"> Logout</Typography>
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")
              }
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "teal",

                borderRadius: "8px",
                borderColor: "teal",
                borderWidth: "2px",
                "&:hover": {
                  color: "#FFFFFF",
                  bgcolor: "teal",
                },
              }}
            >
              <Typography variant="body2"> Sign in</Typography>
            </Button>
          )}
        </Stack>
      </Stack>
      <Drawer
        open={drawer}
        onClose={closeDrawer}
        anchor="left"
        bgcolor="white"
        sx={{
          zIndex: "1200",
          "& .MuiPaper-root": {
            backgroundColor: "white",
          },
        }}
      >
        <NavBarDrawer />
      </Drawer>
    </Container>
  );
};

export default Navbar;
