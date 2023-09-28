import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Stack,
  Divider,
  styled,
  Drawer,
} from "@mui/material";
import Sort from "./sort";
import Card from "./card";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import Range from "./range";
import Type from "./type";
import { publicRequest } from "../../requestMethods";

export const CustomDivider = styled(Divider)`
  margin: 16px 0px 24px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const EstateListing = () => {
  const [drawer, setDrawer] = useState(false);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("newest");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/estate`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  return (
    <>
      <Announcement />
      <Navbar />
      <Box bgcolor="#F6F9FC" py={5}>
        <Container maxWidth="lg">
          <Sort openDrawer={openDrawer} sort={sort} setSort={setSort} />
          <Grid container spacing={3} marginTop={4}>
            <Grid item md={3} display={{ xs: "none", md: "block" }}>
              <Box
                bgcolor="white"
                py={3}
                px={2}
                borderRadius="5px"
                sx={{
                  boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
                }}
              >
                <CustomDivider />

                <Type
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                />
                <CustomDivider />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack spacing={3}>
                {products.map((prod) => (
                  <Card {...prod} />
                ))}
              </Stack>
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
          <CustomDivider />
          <Type />
        </Box>
      </Drawer>
      <Footer />
    </>
  );
};

export default EstateListing;
