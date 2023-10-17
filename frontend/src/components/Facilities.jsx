import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import {
  LocalParkingOutlined,
  LocalDrinkOutlined,
  WbIncandescentOutlined,
  HotelOutlined,
  LocalFloristOutlined,
  NatureOutlined,
  HomeWorkOutlined,
  WifiOutlined,
  LocationCityOutlined,
} from "@material-ui/icons";

const Facilities = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const data = [
    {
      Icon: LocalParkingOutlined,
      title: "Ample Parking",
      desc: "Plenty of parking space for your convenience.",
    },
    {
      Icon: LocalDrinkOutlined,
      title: "24/7 Water Supply",
      desc: "Continuous water supply available 24/7.",
    },
    {
      Icon: WbIncandescentOutlined,
      title: "Stable Electricity",
      desc: "Reliable and stable electricity supply.",
    },
    {
      Icon: HotelOutlined,
      title: "Short-term Lets",
      desc: "Perfect for short-term stays and vacations.",
    },
    {
      Icon: LocalFloristOutlined,
      title: "Gardens",
      desc: "Beautifully landscaped gardens to relax in.",
    },
    {
      Icon: NatureOutlined,
      title: "Ambiance",
      desc: "A peaceful and pleasant atmosphere.",
    },
    {
      Icon: HomeWorkOutlined,
      title: "Smart Houses",
      desc: "Modern homes with smart technology.",
    },
    {
      Icon: WifiOutlined,
      title: "Wi-fi",
      desc: "High-speed Wi-Fi for your connectivity needs.",
    },
    {
      Icon: LocationCityOutlined,
      title: "Beautiful Properties",
      desc: "Stunning properties in picturesque locations.",
    },
  ];

  return (
    <Stack width={{ xs: "95%", md:"75%",  lg:"65%"}} margin="0 auto" pb={6} spacing={2}>
      <Typography variant="h5" textAlign="center" fontSize="28px">
        OUR FACILITIES
      </Typography>
      <Typography variant="h6" textAlign="center" color="text.secondary">
        WE PROVIDE FULL SERVICES EVERY STEP OF THE WAY
      </Typography>
      <Grid container spacing={3} sx={{
        marginLeft: "-24px !important"
      }}>
        {data.map(({ Icon, title, desc }) => (
          <Grid item xs={12}  sm={6} lg={4} >
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                gap: "10px",
                border: "1px solid #dee2e6",
                borderRadius: "10px",
                flexDirection: isNonMobile ? "row" : "column",
                alignItems: isNonMobile ? "start" : "center",
                paddingX: 2.5,
                paddingY: 3.5,
                height: "150px"
              }}
            >
              <Icon
                sx={{
                  fontSize: "2.4rem",
                }}
              />
              <Stack spacing={0.5}>
                <Typography
                  variant="h6"
                  fontSize={{ xs: "15px", sm: "18px" }}
                  textAlign={{ xs: "center", sm: "left" }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  textAlign={{ xs: "center", sm: "left" }}
                  fontSize={{ xs: "12px", sm: "14px" }}
                  color="text.secondary"
                >
                  {desc}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Facilities;
