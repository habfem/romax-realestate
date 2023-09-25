import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import {
  Box,
  Typography,
  Stack,
  Divider,
  styled,
  Container,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import { publicRequest } from "../../requestMethods";
import { useLocation } from "react-router";
import { Formik } from "formik";
import * as yup from "yup";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&.Mui-focused fieldset": {
      borderColor: "teal",
    },
  },
});

export const CustomDivider = styled(Divider)`
  margin: 16px 0px 16px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: "#f4f4f5";
`;

const Booking = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const isNonMobile = useMediaQuery("(min-width:750px)");

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
      <Container maxWidth="lg">
        <Box
          sx={{
            columnGap: "24px",
            rowGap: "24px",
            alignItems: "flex-start",
            display: "flex",
            // flexWrap: "wrap",
            justifyContent: "center",
            py: 5,
            flexDirection: isNonMobile ? "row" : "column",
          }}
        >
          <Box
            sx={{
              flexGrow: "1",
              maxWidth: isNonMobile ? "550px" : "100%",
              width: isNonMobile ? "auto" : "100%",
              backgroundColor: "rgb(255, 255, 255)",
              boxShadow: "rgb(161, 161, 172) 0px 2px 6px",
              borderColor: "rgb(113, 113, 132)",
              borderRadius: "8px",
              paddingX: isNonMobile ? 3 : 2,
              paddingY: 4,
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h5">Contact Romax Properties</Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 4 }}
              >
                <Typography variant={{ xs: "subtitle2", sm: "body1" }}>
                  Email about:
                </Typography>
                <Typography variant={{ xs: "subtitle2", sm: "body1" }}>
                  {product?.title}
                </Typography>
              </Stack>
              <Formik
                enableReinitialize={true}
                onSubmit={(values) => {
                }}
                initialValues={initialValues}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isValid,
                  dirty,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={2}> 
                    <CustomTextField
                     fullWidth
                      variant="outlined"
                      type="text"
                      label="Telephone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      name="phone"
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      InputLabelProps={{
                        style: { fontSize: "16px" },
                      }}
                    />
                    <CustomTextField
                      fullWidth
                      variant="outlined"
                      type="email"
                      label="Email Address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      InputLabelProps={{
                        style: { fontSize: "16px" },
                      }}
                    />
                    <CustomTextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Your message"
                      multiline
                      rows={6}
                      name="message"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.message}
                      error={!!touched.message && !!errors.message}
                      helperText={touched.message && errors.message}
                      InputLabelProps={{
                        style: { fontSize: "16px" },
                      }}
                    />
                    </Stack>
                   
                    <Button
                      sx={{
                        textTransform: "none",
                        bgcolor: "teal",
                        color: "white",
                        fontSize: "16px",
                        // paddingX: "15px",
                        fontWeight: 600,
                        paddingY: "10px",
                        borderRadius: "8px",
                        alignItems: "center",
                        mt: "20px",
                        "&:hover": {
                          backgroundColor: "teal",
                        },
                      }}
                    >
                      Send Email
                    </Button>
                  </form>
                )}
              </Formik>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: isNonMobile ? "324px" : "100%",
              backgroundColor: "rgb(255, 255, 255)",
              boxShadow: "rgb(161, 161, 172) 0px 2px 6px",
              borderColor: "rgb(113, 113, 132)",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                height: isNonMobile ? "200px" : "400px",
                width: "100%",
                borderRadius: "5px 5px 0px 0px",
              }}
            >
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "5px 5px 0px 0px",
                }}
                alt="Property"
                src={product?.img ? product?.img[0] : ""}
              />
            </Box>
            <Box bgcolor="#f4f4f5" p={2} sx={{}}>
              <Typography color="teal" variant="h6" fontSize="22px">
                {`₦ ${product?.price?.toLocaleString()}`}
              </Typography>
            </Box>
            <Box bgcolor="white" px={2} py={3} borderRadius="0 0 5px 5px ">
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">{product?.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <HotelOutlinedIcon />
                  <Typography>
                    {" "}
                    <span style={{ fontSize: "12px" }}>X</span>
                    {product?.bed}
                  </Typography>
                </Stack>
              </Stack>
              <Typography mt={1} color="#7D879C" variant="subtitle2">
                {product?.location}
              </Typography>
              <CustomDivider />
              <Stack>
                <Typography
                  color="#7D879C"
                  variant="subtitle2"
                  letterSpacing={1.5}
                  fontSize="13px"
                >
                  Property Owned by
                </Typography>
                <Typography variant="body2" letterSpacing={1.2}>
                  Romax Properties Limited
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
      <Newsletter />
      <Footer />
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const bookingSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  email: yup.string().email("invalid email").required("required"),
  message: yup.string().required("required"),
});

const initialValues = {
  message: "",
  email: "",
  phone: "",
};
export default Booking;
