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
          <Typography variant="h5" letterSpacing="3px" color="teal">
            ROMAX
          </Typography>
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
              py={1}
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
              py={1}
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
              py={1}
              sx={{
                "&:hover": {
                  color: "teal",
                },
              }}
            >
              Instant Valuation
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
              py={1}
              sx={{
                "&:hover": {
                  color: "teal",
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
              color: "teal",
              width: "100%",
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
            onClick={() => navigate("/login")}
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "teal",
              width: "100%",
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
      </Box>
    </Stack>
  );
};

export default NavBarDrawer;
