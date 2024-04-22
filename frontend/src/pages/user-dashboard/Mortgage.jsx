import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
//import { statesInNigeria } from "./data";
import { Link, useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import Header from "./Header";
import { userRequest } from "../../requestMethods";

const Mortgage = ({ openDrawer }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [address, setAddress] = useState({});
  const isNonMobile = useMediaQuery("(min-width:968px)");

  const handleNewAddress = async (data) => {
    try {
      const res = await userRequest.post(`/mortgage`, data);
      navigate("/user/mortgages");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAddress = async (data) => {
    try {
      const res = await userRequest.put(`/mortgage/${id}`, data);
      navigate("/user/mortgages");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        const res = await userRequest.get(`/mortgage/${id}`);
        setAddress(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (id !== "new") {
      getAddress();
    }
  }, [id]);

  const initialValues = {
    downPayment: address?.downPayment || "",
    interest: address?.interest || "",
    years: address?.years || "",
    //state: address?.state || "",
  };
  return (
    <Stack spacing={2}>
      <Header
        Icon={PlaceIcon}
        title={id === "new" ? "Add Mortgage" : "Edit Mortgage"}
        openDrawer={openDrawer}
        button="Back To Mortgage"
        link={`/user/mortgages`}
      />

      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          paddingX: isNonMobile ? 5 : 2,
          paddingY: 4,
        }}
      >
        <Formik
          enableReinitialize={true}
          onSubmit={(values) => {
            if (id !== "new") {
              handleUpdateAddress(values);
            } else {
              handleNewAddress(values);
            }
          }}
          initialValues={initialValues}
          validationSchema={addressSchema}
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
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="Enter downPayment"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.downPayment}
                  name="downPayment"
                  error={!!touched.downPayment && !!errors.downPayment}
                  helperText={touched.downPayment && errors.downPayment}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiInputBase-root": {
                      fontSize: "15px",
                    },
                  }}
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="Enter Interest rate"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.interest}
                  name="interest"
                  error={!!touched.interest && !!errors.interest}
                  helperText={touched.interest && errors.interest}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiInputBase-root": {
                      fontSize: "15px",
                    },
                  }}
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="Enter Number of years"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.years}
                  name="years"
                  error={!!touched.years && !!errors.years}
                  helperText={touched.years && errors.years}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiInputBase-root": {
                      fontSize: "15px",
                    },
                  }}
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
                />
              </Box>
              <Button
                type="submit"
                disabled={!isValid || (!dirty && id === "new")}
                sx={{
                  mt: 4,
                  textTransform: "none",
                  bgcolor:
                    !isValid || (!dirty && id === "new")
                      ? "#0000001f !important"
                      : "primary.main",
                  color: "white",
                  fontSize: "14px",
                  paddingX: "20px",
                  fontWeight: 500,
                  paddingY: "8px",
                  alignSelf: "start",
                  "&:hover": {
                    backgroundColor: "#fc973f",
                  },
                }}
              >
                {id === "new" ? "Save Mortgage" : "Save Changes"}
              </Button>
            </form>
          )}
        </Formik>{" "}
      </Paper>
    </Stack>
  );
};

export default Mortgage;


const addressSchema = yup.object().shape({
  downPayment: yup.string().required("required"),
  interest: yup.string().required("required"),
  years: yup.string().required("required"),
});
