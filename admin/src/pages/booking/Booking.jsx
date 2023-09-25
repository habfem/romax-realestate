import { useState, useEffect } from "react";
import "../user/user.css";

import {
  Box,
  Stack,
  Grid,
  Typography,
  useMediaQuery,
  CircularProgress,
  Button,
} from "@mui/material";
import Carousel from "./ProdDescCarousel";
import { useLocation, useNavigate } from "react-router";
import { userRequest } from "../../requestMethods";
import { dateConverter } from "./utils";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});
  const [dateValue, setDateValue] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get(`/booking/${id}`);
        console.log(res.data);
        setBooking(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleUpdateDate = async () => {
    try {
      const res = await userRequest.put(`booking/${id}`, {
        viewDate: dateValue,
      });
      if (res.data) {
        navigate("/bookings");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{flex:4 , padding: "0 20px"}}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box paddingBottom="30px">
          <Box maxWidth="1000px">
            <Typography
              variant="h5"
              color="text.primary"
              textAlign="center"
              mb={4}
              fontSize={{ xs: "20px", md: "25px" }}
            >
              Booking Details
            </Typography>
            <Stack spacing={1} mb={2}>
              <Stack direction="row" spacing={1.5}>
                <Typography>BookingID: </Typography>
                <Typography color="#7D879C">{booking?.bookingId}</Typography>
              </Stack>
              <Stack direction="row" spacing={1.5}>
                <Typography> Book Date: </Typography>
                <Typography color="#7D879C">
                  {dateConverter(booking?.bookDate)}
                </Typography>
              </Stack>{" "}
              <Stack direction="row" spacing={1.5}>
                <Typography>View Date: </Typography>
                <Typography color="#7D879C">
                  {booking?.viewDate
                    ? dateConverter(booking?.viewDate)
                    : "Pending"}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={3}
                sx={{
                  marginTop: "20px !important",
                }}
              >
                <DatePicker
                  fullWidth
                  label="View Date"
                  value={
                    booking?.viewDate ? dayjs(booking?.viewDate) : dateValue
                  }
                  onChange={(date) => {
                    setDateValue(date.toISOString());
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: "15px",
                    },
                  }}
                />
                <Button
                  onClick={handleUpdateDate}
                  // disabled={!isValid || isLoading || !dirty}
                  sx={{
                    mt: 4,
                    textTransform: "none",
                    bgcolor: "primary.main",
                    color: "white",
                    fontSize: "14px",
                    paddingX: "20px",
                    fontWeight: 600,
                    paddingY: "8px",
                    alignSelf: "start",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  Update View Date
                </Button>
              </Stack>
            </Stack>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  gap: 1,
                }}
              >
                <Carousel images={booking?.product?.img} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Typography variant="h5">
                    {booking?.product?.title}
                  </Typography>

                  <Typography variant="h5" color="teal">
                    {`₦ ${booking?.product?.price?.toLocaleString()}`}
                  </Typography>

                  <Stack direction="row" spacing={5}>
                    <Stack spacing={0.3}>
                      <Typography variant="subtitle1">Location: </Typography>
                      <Typography variant="subtitle1">Category: </Typography>
                      {booking?.stock <= 0 ? (
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
                        {booking?.product?.location || "No Type"}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {booking?.product?.category}
                      </Typography>

                      <Typography variant="subtitle2" color="text.secondary">
                        {booking?.product?.inStock ? "Yes" : "No"}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="subtitle2" color="text.secondary">
                    {booking?.product?.desc}
                  </Typography>

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
                          <Typography>{booking?.product?.bed}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="teal">
                            Bathrooms
                          </Typography>
                          <Typography>{booking?.product?.bath}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="teal">
                            Car Parking
                          </Typography>
                          <Typography>{booking?.product?.parking}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Stack spacing={1}>
                          <Typography variant="subtitle1" color="teal">
                            Size
                          </Typography>
                          <Typography>{booking?.product?.size}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Product;
