import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Stack,
  Typography,
  Divider,
  styled,
  Drawer,
  CircularProgress,
  Button,
} from "@mui/material";
import Sort from "./sort";
import Card from "./card";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import Range from "./range";
import { publicRequest } from "../../requestMethods";
import { useLocation, useNavigate } from "react-router";
import { SentimentVeryDissatisfied } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../redux/filter";
export const CustomDivider = styled(Divider)`
  margin: 16px 0px 24px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const ProductListing = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();
  const {
    location,
    minPrice,
    maxPrice,
    minBed,
    maxBed,
    minCar,
    maxCar,
    type,
    sort,
  } = useSelector((state) => state.filter);
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [products, setProducts] = useState([]);

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const handleRefresh = () => {
    navigate("/products");
    dispatch(resetState());
  };
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const queryParams = `${sort ? `sort=${sort}&` : ""}${
        minPrice ? `minPrice=${minPrice}&` : ""
      }${maxPrice ? `maxPrice=${maxPrice}&` : ""}${
        minBed ? `minBed=${minBed}&` : ""
      }${maxBed ? `maxBed=${maxBed}&` : ""}${
        minCar ? `minCar=${minCar}&` : ""
      }${maxCar ? `maxCar=${maxCar}&` : ""}${
        type ? `propertyType=${type}&` : ""
      }${location ? `location=${location}&` : ""}`;
      try {
        console.log(queryParams);
        const res = await publicRequest.get(`/products?${queryParams}`);
        setLoading(false);
        setProducts(res.data);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    };
    getProducts();
  }, [
    sort,
    minPrice,
    maxPrice,
    minBed,
    maxBed,
    minCar,
    maxCar,
    type,
    location,
  ]);
  console.log(maxBed)
  return (
    <>
      <Announcement />
      <Navbar />
      <Box bgcolor="#f4f4f5" py={5}>
        <Container maxWidth="lg">
          <Sort openDrawer={openDrawer} products={products} />
          <Grid container spacing={3} marginTop={4}>
            <Grid item md={3} display={{ xs: "none", md: "block" }}>
              <Box
                bgcolor="white"
                py={3}
                px={2}
                borderRadius="10px"
                sx={{
                  boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
                }}
              >
                <Range />

                {/* <Type
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                /> */}
                <CustomDivider />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              {loading ? (
                <Box
                  sx={{
                    height: "500px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : products.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                    height: "500px",
                    textAlign: "center",
                  }}
                >
                  <SentimentVeryDissatisfied
                    sx={{
                      fontSize: "40px",
                    }}
                  />
                  <Typography variant="h6">
                    Sorry, we couldn't find the property you are looking for.{" "}
                  </Typography>
                  <Typography variant="h6">
                    Please explore our other exciting Properties!{" "}
                  </Typography>
                  <Button
                    onClick={handleRefresh}
                    sx={{
                      textTransform: "none",
                      bgcolor: "primary.main",
                      color: "white",
                      paddingX: "30px",
                      paddingY: "15px",
                      alignSelf: "center",
                      display: "flex",
                      gap: "5px",
                      borderRadius: "16px",
                      "&:hover": {
                        backgroundColor: "#119595",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize="17px"
                      letterSpacing="1px"
                    >
                      {" "}
                      Discover More
                    </Typography>
                  </Button>
                </Box>
              ) : (
                <Stack spacing={3}>
                  {products.map((prod) => (
                    <Card {...prod} />
                  ))}
                </Stack>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Newsletter />

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
        <Box
          bgcolor="white"
          py={3}
          px={2.2}
          borderRadius="5px"
          sx={{
            width: "300px",
            height: "100vh",

            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#ebeff7",
              borderRadius: "100px",
            },
          }}
        >
          <Range />
          <CustomDivider />
          {/* <Type /> */}
        </Box>
      </Drawer>
      <Footer />
    </>
  );
};

export default ProductListing;
