import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { publicRequest } from "../../requestMethods";

import {
  Box,
  Stack,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Paper,
  Container as ContainerBox,
  useMediaQuery,
} from "@mui/material";
import { features } from "../../data";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
//import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Tab from "./Tab";
import Carousel from "./ProdDescCarousel";
import { useLocation, useNavigate } from "react-router";
//import { userRequest } from "../../requestMethods";
//import makeToast from "../../toaster";

const Estate = () => {
  const location = useLocation();
  //const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  //const [toggle, setToggle] = useState(false);
  //const recipientEmail = "recipient@example.com";

  useEffect(() => {
    const getEstate = async () => {
      try {
        const res = await publicRequest.get(`/estate/find/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getEstate();
  }, [id]);

  return (
    <Box>
      <Announcement />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Box paddingY="40px">
          <ContainerBox maxWidth="lg">
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  gap: 1,
                }}
              >
                <Carousel images={product?.img} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Typography variant="h5">{product?.title}</Typography>
                  <Typography variant="subtitle1">{product?.categories}</Typography>

                  {/* <Typography variant="h5" color="primary.main">
                    {`₦ ${product?.price?.toLocaleString()}`}
                  </Typography> */}

                  {/* <Stack direction="row" spacing={5}>
                    <Stack spacing={0.3}>
                      <Typography variant="subtitle1">Location: </Typography>
                      <Typography variant="subtitle1">Category: </Typography>
                      {product?.stock <= 0 ? (
                        <Typography
                          variant="subtitle2"
                          color="white"
                          p={0.4}
                          px={2}
                          sx={{
                            backgroundColor: "#E3364E",
                            borderRadius: "10px",
                            marginTop: "10px !important",
                          }}
                        >
                          Out Of Stock
                        </Typography>
                      ) : (
                        <Typography variant="subtitle1">Available: </Typography>
                      )}
                    </Stack>
                    <Stack spacing={0.3}>
                      <Typography variant="subtitle2">
                        {product?.location || "No Type"}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {product?.category}
                      </Typography>

                      <Typography variant="subtitle2" color="text.secondary">
                        {product?.inStock ? "Yes" : "No"}
                      </Typography>
                    </Stack>
                  </Stack> */}
                  <Typography variant="subtitle2" color="text.secondary">
                    {product?.desc}
                  </Typography>

                  <Box
                    justifyContent={{ xs: "center", sm: "left" }}
                    sx={{
                      padding: "13px 0",
                      borderWidth: "1px 0",
                      borderStyle: "dashed",
                      borderColor: "#ddd",
                      display: "flex",
                      gap: "15px",
                    }}
                  >
                    <Button
                      disabled={product?.stock <= 0}
                      onClick={() => {
                        navigate(`/bookings/${product._id}`);
                      }}
                      sx={{
                        textTransform: "none",
                        bgcolor: "primary.main",
                        color: "white",
                        fontSize: "14px",
                        paddingX: "25px",
                        fontWeight: 600,
                        paddingY: "12px",
                        alignSelf: "start",
                        display: "flex",
                        gap: "10px",
                        borderRadius: "16px",
                        "&:hover": {
                          backgroundColor: "#119595",
                        },
                      }}
                    >
                      <MailOutlineIcon />
                      <Typography variant="subtitle1"> Send Email</Typography>
                    </Button>
                    <Tooltip title="Whatsapp">
                      <IconButton
                        sx={{
                          backgroundColor: "#e9ecef",
                          borderRadius: "16px",
                          paddingX: "12px",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <WhatsAppIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Stack>
                    <Typography variant="body2" mb={1}>
                      Property Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="primary.main">
                            Estate Type
                          </Typography>
                          <Typography>{product?.categories}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="primary.main">
                            Houses
                          </Typography>
                          <Typography>{product?.house}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              sx={{
                my: 5,
              }}
            >
              {features.map(({ Icon, details }, index) => (
                <Grid key={index} item sm={6}>
                  <Paper
                    elevation={3}
                    bgcolor="white"
                    color="#e9ecef"
                    sx={{
                      border: "1px solid #dee2e6",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      p: 7,
                      gap: 1.5,
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: isNonMobile ? "50px" : "2.4rem",
                        color: "primary.main",
                      }}
                    />
                    <Typography>{details}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Tab product={product} />
          </ContainerBox>
        </Box>
      )}
      <Newsletter />
      <Footer />
    </Box>
  );
};

export default Estate;
