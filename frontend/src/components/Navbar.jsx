import React, { useState } from "react";
import styled from "styled-components";
import { Search } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import {
  Typography,
  Stack,
  Container,
  Button,
  Drawer,
  Box,
  useMediaQuery
} from "@mui/material";
import NavBarDrawer from "./NavBarDrawer";
import MobileNavBar from "./MobileNavBar";
import logo from "../assests/Logo-Transparent.png";

const Navbar = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
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
        // py={{ xs:1.8,  md:2.5}}
        sx={
          {
            // boxShadow: "rgb(161, 161, 172) 0px 2px 6px",
            // borderColor: "rgb(113, 113, 132)",
          }
        }
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <Box >
            <img
              src="https://static.wixstatic.com/media/38c36f_cf2679a5ddd4403fa15dda614149c8f9~mv2.png/v1/fill/w_187,h_113,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PHOTO-2021-09-15-13-59-41_edited.png"
              alt="Romax Properties Ltd Logo"
              style={{
                height: isNonMobile ? "100px" : "70px"
              }}
            />
          </Box>
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
                  color: "primary.main",
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
                  color: "primary.main",
                },
              }}
            >
              Our Estates
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
                  color: "primary.main",
                },
              }}
            >
              Our Timeline
            </Typography>
          </Link>
          {/* <Link
            to="/blogs"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              color="#2b3445"
              variant="body2"
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              Our Blogs
            </Typography>
          </Link> */}
          {/* <Link
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              color="#2b3445"
              variant="body2"
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              Instant Valuation
            </Typography>
          </Link> */}
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
                    color: "primary.main",
                  },
                }}
              >
                {`Hi,${user.username}`}
              </Typography>
            </Link>
          )}
          {user && user.isAdmin && (
            <Link
              to="https://romax-admin.netlify.app/login"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                color="#2b3445"
                variant="body2"
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {`Admin`}
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
                  color: "primary.main",
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
                color: "primary.main",

                borderRadius: "8px",
                borderColor: "primary.main",
                borderWidth: "2px",
                "&:hover": {
                  color: "#FFFFFF",
                  bgcolor: "primary.main",
                },
              }}
            >
              <Typography variant="body2"> Logout</Typography>
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "primary.main",

                borderRadius: "8px",
                borderColor: "primary.main",
                borderWidth: "2px",
                "&:hover": {
                  color: "#FFFFFF",
                  bgcolor: "primary.main",
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
