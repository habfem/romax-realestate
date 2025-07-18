import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Grid,
  useMediaQuery,
  IconButton,
  Modal,
} from "@mui/material";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import SortIcon from '@mui/icons-material/Sort';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { DirectionsCar } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Carousel from "./ProdListCarousel";
import { dateConverter } from "../user-dashboard/utils";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import makeToast from "../../toaster";
import Login from "../../pages/Login";

const Card = (props) => {
  const {
    _id,
    title,
    desc,
    price,
    bath,
    bed,
    img,
    car,
    isFeatured,
    propertyType,
    createdAt,
    views,
    energyEfficiency,
  } = props;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const [toggle, setToggle] = useState(false);
  const [mortgageEstimation, setMortgageEstimation] = useState(null);
  // const [showLoginModal, setShowLoginModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  useEffect(() => {
    const fetchMortgageData = async () => {
      try {
        const mortgageResponse = await userRequest.get("/mortgage");
        const activeMortgage = mortgageResponse.data.find(mortgage => mortgage.active);
  
        if (activeMortgage && price) {
          const downPayment = activeMortgage.downPayment;
          const loanAmount = price - downPayment;
          const interestRate = activeMortgage.interest / 100;
          const loanTerm = activeMortgage.years;
  
          const monthlyPayment = amortize(loanAmount, interestRate, loanTerm);
          setMortgageEstimation(monthlyPayment);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchMortgageData();
  }, [price]);
  

  const amortize = (borrowedSum, interestRate, loanPeriod) => {
    const monthsInYear = 12;
    const adjustedLoanPeriodMonths = loanPeriod * monthsInYear;
    const adjustedInterestRateMonths = interestRate / monthsInYear;

    const payments = borrowedSum * (adjustedInterestRateMonths / (1 - Math.pow(1 + adjustedInterestRateMonths, -adjustedLoanPeriodMonths)));

    return payments.toFixed(2);
  };

  const handleSavedProperty = async () => {
    if (!user) {
      handleOpen();
      return;
    }
    try {
      const res = await userRequest.put(`/users/save-property/${_id}`);
      if (res.data) {
        makeToast("success", res.data.message);
        setToggle(!toggle);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <Link
            to={`/product/${_id}`}
            style={{ textDecoration: "none", color: "#2b3445" }}
          >
            <Stack
              sx={{
                // height: "370px",
                // overflow: "hidden",
                // borderBottomLeftRadius: "10px",
                height: "100%",
                // display: "none"
              }}
            >
              <Box
                sx={{
                  height: "75%",
                  // height: "250px",
                }}
              >
                <Carousel images={img} />
              </Box>

              {!isFeatured ? (
                <Box
                  bgcolor="#f4f4f5"
                  p={2}
                  sx={{
                    // minHeight: "80px",
                    height: "25%",
                    overflow: "hidden",
                    borderBottomLeftRadius: isNonMobile ? "10px" : 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Stack spacing={0.5} justifyContent="center" color="primary.main">
                  <Stack spacing={0.5} direction="row" justifyContent="center" alignItems="center" color="primary.main">
                    <Typography variant="h5">
                      {`₦ ${price?.toLocaleString()}`}
                   </Typography>
                  <Typography variant="subtitle2" paddingLeft="150px" letterSpacing={1.1}>
                    Monthly Mortgage: 
                  </Typography>
                </Stack>
                <Stack spacing={0.5} direction="row" justifyContent="start" alignItems="start" color="primary.main">
                    <Typography variant="subtitle2" letterSpacing={1.3}>
                    Offers Over
                   </Typography>
                  <Typography variant="subtitle2" paddingLeft="250px" letterSpacing={1.1}>
                  ₦ {numberWithCommas(addDecimals(mortgageEstimation))} 
                  </Typography>
                </Stack>
                  </Stack>
                </Box>
              ) : (
                <Box
                  bgcolor="#e78f2a"
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
                      <Stack spacing={0.5} direction="row" justifyContent="start" alignItems="center">
                      <Typography variant="h5">
                      {`₦ ${price?.toLocaleString()}`}
                      </Typography>
                      <Typography variant="subtitle2" paddingLeft="5px" letterSpacing={1.1}>
                        Monthly Mortgage: 
                      </Typography>
                      </Stack>
                    <Stack spacing={0.5} direction="row" justifyContent="start" alignItems="start">
                      <Typography variant="subtitle2" letterSpacing={1.3}>
                    Offers Over
                   </Typography>
                  <Typography variant="subtitle2" paddingLeft="110px" letterSpacing={1.1}>
                  ₦ {numberWithCommas(addDecimals(mortgageEstimation))} 
                  </Typography>
                  </Stack>
                    </Stack>
                    
                    <Box
                      p={2}
                      sx={{
                        flex: isNonMobile ? "0 0 30%" : "0 0 40%",
                        display: "flex",
                        justifyContent: "center",
                        bgcolor: "primary.main",
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
          </Link>
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
            <Link
              to={`/product/${_id}`}
              style={{ textDecoration: "none", color: "#2b3445" }}
            >
              <Typography variant="body2">{title}</Typography>
              <Stack direction="row" spacing={3}>
                <Typography variant="body1">
                  {propertyType || "Semi-Detached"}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <HotelOutlinedIcon />
                  <Typography variant="body1">
                    <span style={{ fontSize: "10px" }}>X</span>
                    {bed}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <BathtubOutlinedIcon />
                  <Typography variant="body1">
                    <span style={{ fontSize: "10px" }}>X</span>
                    {bath}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <DirectionsCar />
                  <Typography variant="body1">
                    <span style={{ fontSize: "10px" }}>X</span>
                    {car}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <SortIcon />
                  <Typography variant="body1">
                    {energyEfficiency}
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="subtitle2" color="#7D879C" mt={1.5}>
                {`${desc.substring(0, 200)}...`}
              </Typography>

              <Stack spacing={20} direction="row" alignItems="center">
              <Typography variant="subtitle1" color="primary.main" mt={3}>
                {`Added on ${dateConverter(createdAt)}`}
              </Typography>
              <Typography variant="subtitle1" color="primary.main" mt={1}>
                {`${views} views`}
              </Typography>
              </Stack>
            </Link>

            <Stack direction="row" justifyContent="space-between" mt={3}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Stack color="#7D879C">
                  <Typography variant="subtitle1">0161 232 0345</Typography>
                  <Typography variant="subtitle1">Hotline</Typography>
                </Stack>
                <IconButton onClick={() => navigate(`/booking/${_id}`)}>
                  <EmailOutlinedIcon
                    sx={{
                      fontSize: "25px",
                    }}
                  />
                </IconButton>
              </Stack>

              <Stack spacing={0.4} direction="row" alignItems="center">
                <IconButton onClick={handleSavedProperty}>
                  {toggle ? (
                    <FavoriteIcon sx={{ color: "primary.main" }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon />
                  )}
                </IconButton>
                <Typography variant="subtitle1">Save</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Login handleClose={handleClose} />
        </Box>
      </Modal>{" "}
    </Box>
  );
};

export default Card;
