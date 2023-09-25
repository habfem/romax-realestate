import { Box, Typography, Stack, Grid, useMediaQuery } from "@mui/material";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Carousel from "./Carousel";

const Card = ({ feature }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      bgcolor="white"
      borderRadius="10px"
      sx={{
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
      }}
    >
      <Grid
        container
        spacing={2}
        width="100%"
        sx={{
          marginLeft: "0 !important",
          marginTop: "0 !important",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6.5}
          sx={{
            padding: "0 !important",
          }}
        >
          <Stack
            sx={{
              height: "100%",
            }}
          >
            <Box
              sx={{
                height: "75%",
              }}
            >
              <Carousel />
            </Box>

            {feature ? (
              <Box
                bgcolor="#f4f4f5"
                p={2}
                sx={{
                  height: "25%",
                  overflow: "hidden",
                  borderBottomLeftRadius: isNonMobile ? "10px" : 0,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Stack spacing={0.5} justifyContent="center">
                  <Typography variant="h5">₦50,000,000</Typography>
                  <Typography variant="subtitle2" letterSpacing={1.3}>
                    Offers Over
                  </Typography>
                </Stack>
              </Box>
            ) : (
              <Box
                bgcolor="rgb(12, 136, 82)"
                color="white"
                sx={{
                  height: "25%",
                  overflow: "hidden",
                  borderBottomLeftRadius: isNonMobile ? "10px" : 0,
                }}
              >
                <Stack direction="row" height="100%">
                  <Stack
                    p={2}
                    spacing={0.5}
                    justifyContent="center"
                    sx={{
                      flex: isNonMobile ? "0 0 70%" : "0 0 60%",
                    }}
                  >
                    <Typography variant="h5">₦50,000,000</Typography>
                    <Typography variant="subtitle2" letterSpacing={1.3}>
                      Offers Over
                    </Typography>
                  </Stack>
                  <Box
                    p={2}
                    sx={{
                      flex: isNonMobile ? "0 0 30%" : "0 0 40%",
                      display: "flex",
                      justifyContent: "center",
                      bgcolor: "rgb(11, 111, 63)",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      textAlign="center"
                      sx={{
                        lineHeight: 1.3,
                      }}
                    >
                      PREMIUM LISTING
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          sm={5.5}
          sx={{
            padding: "0 !important",
          }}
        >
          <Stack px={2} py={2.5} height="100%">
            <Typography variant="body2">
              Number 1 Deansgate, Manchester
            </Typography>
            <Stack direction="row" spacing={3}>
              <Typography variant="body1">Semi-Detached</Typography>
              <Stack direction="row" spacing={1}>
                <HotelOutlinedIcon />
                <Typography variant="body1">
                  <span style={{ fontSize: "12px" }}>X</span>3
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <BathtubOutlinedIcon />
                <Typography variant="body1">
                  <span style={{ fontSize: "12px" }}>X</span>3
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="subtitle2" color="#7D879C" mt={1.5}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam...
            </Typography>
            <Typography variant="subtitle1" color="teal" mt={3}>
              Added on 15/2/23
            </Typography>
            <Stack direction="row" justifyContent="space-between" mt={3}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Stack color="#7D879C">
                  <Typography variant="subtitle1">0161 232 0345</Typography>
                  <Typography variant="subtitle1">Hotline</Typography>
                </Stack>
                <EmailOutlinedIcon
                  sx={{
                    fontSize: "25px",
                  }}
                />
              </Stack>

              <Stack spacing={0.4} direction="row" alignItems="center">
                <FavoriteBorderOutlinedIcon />
                <Typography variant="subtitle1">Save</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Card;
