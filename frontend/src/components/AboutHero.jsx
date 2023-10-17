import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";

const AboutHero = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Stack width="100%" margin="0 auto" pb={6} spacing={2}>
      <Grid container spacing={1}>
        <Paper elevation={3}
          sx={{
            display: "flex",
            gap: "10px",
            border: "1px solid #dee2e6",
            borderRadius: "10px",
            flexDirection: isNonMobile ? "row" : "column",
            alignItems: isNonMobile ? "start" : "center",
            justifyContent: 'center',
            paddingX: 2.5,
            paddingY: 3.5,
            width: "100%",
            //backgroundImage: 'url("https://i.ibb.co/9Y1NYS4/NEWTERRACE.png")',
            //backgroundColor: 'rgba(255, 255, 255, 0.6)',
            background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://i.ibb.co/0nQJv76/Whats-App-Image-2023-09-04-at-06-30-01.jpg')`,
            backgroundSize: 'cover',
          }}>
          <Stack spacing={0.5}>
            <Typography
              variant="h5"
              fontSize={{ xs: "45px", md: "52px" }}
              mb={4}

              sx={{ textAlign: 'center', color: 'white' }}>
              ABOUT US
            </Typography>
            <br />
            <br />
            <Typography
              variant="h6"
              letterSpacing="3px"
              lineHeight={1.3}
              mb={4}
              color="#e3e1e1"
              sx={{ textAlign: 'center' }} >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta necessitatibus neque magni adipisci ratione sint optio in molestias amet earum perferendis non deserunt, aliquid iure, maxime iste consequatur provident facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ea modi, labore corporis hic natus excepturi. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure veniam cum id, libero consequatur laboriosam, mollitia ut quos aliquid quam molestiae voluptas! Voluptatem, nam? Recusandae nulla doloremque temporibus veritatis quos!
            </Typography>
            <br />
            <br />
          </Stack>
        </Paper>
      </Grid>
    </Stack>
  );
};

export default AboutHero;
