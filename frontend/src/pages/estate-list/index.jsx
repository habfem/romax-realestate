import { useState } from "react";
import { Container, Box, Grid, Stack, Typography, Drawer } from "@mui/material";
import Sort from "./sort";
import Filter from "./filter";
import Card from "./card";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";

const EstateListing = () => {
  const [drawer, setDrawer] = useState(false);
  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };
  return (
    <>
      <Announcement />
      <Navbar />
      <Box bgcolor="#F6F9FC" py={5}>
        <Container maxWidth="lg">
          <Sort openDrawer={openDrawer} />
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
                <Filter />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack spacing={3}>
                <Card />
                <Card feature />
                <Card />
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
          <Filter />
        </Box>
      </Drawer>
      <Footer />
    </>
  );
};

export default EstateListing;
