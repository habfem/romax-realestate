import { useEffect } from "react";
import { Typography, Box, Stack, Button, Link as MuiLink } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/userRedux'

const ILink = ({ text, Icon, url, closeDrawer }) => {
  const location = useLocation();
  const isActive =
    location.pathname === `/user/${url}` ||
    location.pathname.startsWith(`/user/${url}/`);
  return (
    <MuiLink
      component={Link}
      to={`/user/${url}`}
      onClick={closeDrawer}
      underline="none"
      variant="subtitle2"
      color={isActive ? "primary.main" : "text.primary"}
      borderLeft="4px solid"
      borderColor={isActive ? "primary.main" : "transparent"}
      pr={2}
      pl={3.5}
      sx={{
        "&:hover": {
          color: "primary.main",
          borderColor: "primary.main",
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          {Icon}
          <Typography variant="subtitle2">{text}</Typography>
        </Stack>

      </Stack>
    </MuiLink>
  );
};

const DashboardBox = ({ closeDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
  const dashboards = [
    {
      text: "Bookings",
      Icon: <BookmarkBorderIcon />,
      url: "bookings",
    },
    {
      text: "Saved",
      Icon: <FavoriteBorderIcon />,
      url: "saved",
    },
    // { text: "Suppor Icon: <HeadsetMicIcon />, url: "support" },
  ];

  const account = [
    {
      text: "Profile Info",
      Icon: <PersonOutlineOutlinedIcon />,
      url: "profile",
    },
    {
      text: "Addresses",
      Icon: <LocationOnIcon />,
      url: "addresses",
    },
  ];
  return (
    <>
      <Stack spacing={5}>
        <Stack spacing={1.5}>
          <Typography pl={3.5} variant="subtitle2">
            DASHBOARD
          </Typography>
          <Stack spacing={2}>
            {dashboards.map((dashboard, index) => (
              <ILink key={index} {...dashboard} closeDrawer={closeDrawer} />
            ))}
          </Stack>
        </Stack>
        <Stack spacing={1.5}>
          <Typography pl={3.5} variant="subtitle2">
            ACCOUNT SETTINGS
          </Typography>
          <Stack spacing={2}>
            {account.map((dashboard, index) => (
              <ILink key={index} {...dashboard} closeDrawer={closeDrawer} />
            ))}
          </Stack>
        </Stack>
      </Stack>

      <Button
        variant="text"
        onClick={handleLogout}
        sx={{
          textTransform: "none",
          // bgcolor: "#FCE9EC",
          color: "primary.main",
          paddingX: "40px",
          fontWeight: 600,
          paddingY: "6px",
          gap: "5px",
          width: "100%",
          mt: 4,
          // marginTop: "50px !important",
          "&:hover": {
            backgroundColor: "rgba(210, 63, 87, 0.04)",
          },
        }}
      >
        <LogoutIcon />
        <Typography variant="subtitle2">LOGOUT</Typography>
      </Button>
    </>
  );
};

export default DashboardBox;
