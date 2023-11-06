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
  Container as ContainerBox,
  useMediaQuery,
  Paper,
  Modal,
} from "@mui/material";
import { features } from "../../data";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Tab from "./Tab";
import Carousel from "./ProdDescCarousel";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import makeToast from "../../toaster";
import { useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import Login from "../../pages/Login";

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const id = location.pathname.split("/")[2];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSavedProperty = async () => {
    if (!user) {
      handleOpen();
      return;
    }
    try {
      const res = await userRequest.put(`/users/save-property/${id}`);
      if (res.data) {
        makeToast("success", res.data.message);
        setToggle(!toggle);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  return (
    <Box>
      <Announcement />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Box paddingY={{ xs: "10px", md: "40px" }}>
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

                  <Typography variant="h5" color="primary.main">
                    {`₦ ${product?.price?.toLocaleString()}`}
                  </Typography>

                  <Stack direction="row" spacing={5}>
                    <Stack spacing={0.3}>
                      <Stack spacing={2} direction="row">
                        <Typography variant="subtitle1">Address: </Typography>
                        <Typography variant="subtitle2">
                          {product?.address || "Will Updated Soon"}
                        </Typography>
                      </Stack>
                      <Stack spacing={2} direction="row">
                        <Typography variant="subtitle1">Location: </Typography>
                        <Typography variant="subtitle2">
                          {product?.location || "Will Updated Soon"}
                        </Typography>
                      </Stack>
                      <Stack spacing={2} direction="row">
                        <Typography variant="subtitle1">Category: </Typography>
                        <Typography variant="subtitle2">
                          {product?.category || "Will Updated Soon"}
                        </Typography>
                      </Stack>

                      {product?.inStock <= 0 ? (
                        <Typography
                          variant="subtitle1"
                          color="white"
                          p={0.4}
                          px={2}
                          py={1}
                          sx={{
                            backgroundColor: "gray",
                            borderRadius: "10px",
                            marginTop: "10px !important",
                            alignSelf: "start"
                          }}
                        >
                          Out Of Stock
                        </Typography>
                      ) : (
                        <Stack spacing={2} direction="row">
                          <Typography variant="subtitle1"> Stock: </Typography>
                          <Typography variant="subtitle2">
                            {`${product?.inStock} units`}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
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
                        navigate(`/booking/${product._id}`);
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
                          backgroundColor: "#fc973f",
                        },
                      }}
                    >
                      <MailOutlineIcon />
                      <Typography variant="subtitle1"> Send Email</Typography>
                    </Button>

                    <Tooltip title="Save Property">
                      <IconButton
                        onClick={handleSavedProperty}
                        sx={{
                          backgroundColor: toggle ? "primary.main" : "#e9ecef",
                          borderRadius: "16px",
                          paddingX: "12px",
                          color: toggle ? "white" : "black",
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "white",
                          },
                        }}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    </Tooltip>
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
                            Property Type
                          </Typography>
                          <Typography>Semi-Detached Duplex</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="primary.main">
                            Bedrooms
                          </Typography>
                          <Typography>{product?.bed}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="primary.main">
                            Bathrooms
                          </Typography>
                          <Typography>{product?.bath}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="primary.main">
                            Car Parking
                          </Typography>
                          <Typography>{product?.car}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="primary.main">
                            Size
                          </Typography>
                          <Typography>{product?.size}</Typography>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Login handleClose={handleClose} />
      </Modal>{" "}
    </Box>
  );
};

export default Product;
