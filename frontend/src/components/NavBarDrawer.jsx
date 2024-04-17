import { Box, Typography, Stack, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";


const NavBarDrawer = () => {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        width: "300px",
        height: "100%",
      }}
      bgcolor="white"
      py={3}
      px={2.2}
    >
      <Stack spacing={2}>
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
                margin: "0 auto",
                display: "block"
              }}
            />
          </Box>
        </Link>

        <Stack spacing={1.5}>
          <Link
            to="/products"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              color="#2b3445"
              variant="body2"
              py={1}
              ml={20}
              sx={{
                "&:hover": {
                  color: "primary.main",
                  transition: "color 0.7s ease-in-out",
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
              py={1}
              ml={20}
              sx={{
                "&:hover": {
                  color: "primary.main",
                  transition: "color 0.7s ease-in-out",
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
              py={1}
              ml={20}
              sx={{
                "&:hover": {
                  color: "primary.main",
                  transition: "color 0.7s ease-in-out",
                },
              }}
            >
              Our Timeline
            </Typography>
          </Link>
          {/* <Link
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              color="#2b3445"
              variant="body2"
              py={1}
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              Instant Valuation
            </Typography>
          </Link> */}
          <Link
          to="/user/saved"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              color="#2b3445"
              variant="body2"
              py={1}
              ml={20}
              sx={{
                "&:hover": {
                  color: "primary.main",
                  transition: "color 0.7s ease-in-out",
                },
              }}
            >
              Saved
            </Typography>
          </Link>
        </Stack>
      </Stack>

      <Box>
        {user ? (
          <Button
            onClick={handleLogout}
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "primary.main",
              width: "100%",
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
              width: "100%",
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
      </Box>
    </Stack>
  );
};

export default NavBarDrawer;
