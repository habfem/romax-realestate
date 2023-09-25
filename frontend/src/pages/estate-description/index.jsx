import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { useState } from "react";
import Loader from "../../components/Loader";
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
} from "@mui/material";
import { features } from "../../data";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Tab from "./Tab";
import Carousel from "./Carousel";
import { product } from "../user-dashboard/data";
const Product = () => {
  // const location = useLocation();
  // const id = location.pathname.split("/")[2];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  // const user = useSelector(state => state.user.currentUser)

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const res = await publicRequest.get("/products/find/" + id);
  //       setProduct(res.data);
  //       setLoading(false)
  //     } catch (error) {
  //       setLoading(false)
  //     }
  //   }
  //   getProduct();
  // }, [id]);

  /* const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  }; */

  // const handleClick = () => {
  //   dispatch(addProduct({ ...product, color, size }));
  // };
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
                <Carousel images={product.images} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Typography variant="h5">{product?.title}</Typography>

                  <Typography variant="h5" color="teal">
                    {`₦ ${product.price.toLocaleString()}`}
                  </Typography>

                  <Stack direction="row" spacing={5}>
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
                      {product?.stock > 0 && (
                        <Typography variant="subtitle2" color="text.secondary">
                          Yes
                        </Typography>
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
                      sx={{
                        textTransform: "none",
                        bgcolor: "teal",
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

                    <Tooltip title="Like Product">
                      <IconButton
                        sx={{
                          backgroundColor: "#e9ecef",
                          borderRadius: "16px",
                          paddingX: "12px",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "teal",
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
                            backgroundColor: "teal",
                            color: "white",
                          },
                        }}
                      >
                        < WhatsAppIcon/>
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
                          <Typography variant="subtitle1" color="teal">
                            Property Type
                          </Typography>
                          <Typography>Semi-Detached Duplex</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="teal">
                            Bedrooms
                          </Typography>
                          <Typography>4</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="teal">
                            Bathrooms
                          </Typography>
                          <Typography>4.5</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="teal">
                            Car Parking
                          </Typography>
                          <Typography>3</Typography>
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
                  <Stack
                    bgcolor="teal"
                    justifyContent="center"
                    alignItems="center"
                    p={7}
                    textAlign="center"
                    spacing={1.5}
                    color="#e9ecef"
                  >
                    <Icon
                      sx={{
                        fontSize: isNonMobile ? "50px" : "2.4rem",
                      }}
                    />
                    <Typography>{details}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Tab />
          </ContainerBox>
        </Box>
      )}
      <Newsletter />
      <Footer />
    </Box>
  );
};

export default Product;
