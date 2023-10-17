import React, { useState, useEffect, useRef } from "react";
import { Container, Box, Grid, Stack, Divider, styled, Drawer, MenuItem } from "@mui/material";
import Sort from "./sort";
import Card from "./card";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import { publicRequest } from "../../requestMethods";
// import { MenuItem } from "../../components/Navbar";

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
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const scrollToCard = (cardId, event) => {
    // Prevent the default behavior of the event
    event.preventDefault();

    const cardToScrollTo = products.find((prod) => prod._id === cardId);

    if (cardToScrollTo && containerRef.current) {
      const position = cardToScrollTo.position;
      containerRef.current.scrollTo({ top: position, behavior: "smooth" });
    }
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/estate");
        setProducts(
          res.data.map((product, index) => ({
            ...product,
            position: index * 300, // Adjust this based on your card height
          }))
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);
  return (
    <>
      <Announcement />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
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
                    <Stack ref={sidebarRef} spacing={2}>
                      {products.map((prod) => (
                        <MenuItem
                          key={prod._id}
                          data-cardid={prod._id}
                          style={{
                            display: "block",
                            padding: "8px",
                            textDecoration: "none",
                            color: "black",
                            fontSize: "16px",
                            transition: "background-color 0.3s",
                          }}
                          onClick={(event) => scrollToCard(prod._id, event)}
                        >
                          {prod.title}
                        </MenuItem>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Container ref={containerRef} maxWidth="lg">
                    <Stack spacing={3}>
                      {products.map((prod) => (
                        <Card key={prod._id} {...prod} />
                      ))}
                    </Stack>
                  </Container>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      )}
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
          {products.map((prod) => (
            <MenuItem
              key={prod._id}
              data-cardid={prod._id}
              style={{
                display: "block",
                padding: "8px",
                textDecoration: "none",
                color: "black",
                fontSize: "16px",
                transition: "background-color 0.3s",
              }}
              onClick={() => scrollToCard(prod._id)}
            >
              {prod.title}
            </MenuItem>
          ))}
        </Box>
      </Drawer>
      <Footer />
    </>
  );
};

export default EstateListing;
