import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  styled,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams } from "react-router-dom";
import { userRequest } from "../../requestMethods";

import { Formik } from "formik";
import * as yup from "yup";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {
      borderColor: "#4e97fd",
    },
  },
});

const AddFaq = () => {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const [faq, setFaq] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getFaq = async () => {
      try {
        const res = await userRequest.get(`/faq/${id}`);
        setFaq(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (id !== "create") {
      getFaq();
    }
  }, [id]);
  const handleNewFaq = async (data) => {
    setLoading(true);
    try {
      const res = await userRequest.post(`/faq`, data);
      setLoading(false);
      navigate("/faqs");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleEditFaq = async (data) => {
    setLoading(true);
    try {
      const res = await userRequest.put(`/faq/${id}`, data);
      setLoading(false);
      navigate("/faqs");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const initialValues = {
    question: faq?.question || "",
    answer: faq?.answer || "",
  };
  return (
    <Box
      px={{ xs: 2, md: 4 }}
      // py={{ xs: 4, md: 4 }}
      sx={{
        flex: 4,
      }}
    >
      <Stack spacing={3}>
        <Stack
          justifyContent="space-between"
          direction={{ xs: "column", sm: "row" }}
          rowGap={{ xs: 2, sm: 0 }}
          // alignItems="center"
        >
          <Typography variant="h6" fontSize={{ xs: "19px", sm: "21px" }}>
            {id === "create" ? "Create FAQ" : "Edit FAQ"}
          </Typography>

          <Button
            onClick={() => navigate("/faqs")}
            sx={{
              textTransform: "none",
              bgcolor: "#4e97fd",
              color: "white",
              fontSize: "16px",
              paddingX: "15px",
              fontWeight: 600,
              paddingY: "10px",
              alignSelf: isNonMobile ? "start" : "stretch",
              borderRadius: "10px",
              alignItems: "center",
              width: isNonMobile ? "auto" : "100%",
              gap: 1,

              "&:hover": {
                backgroundColor: "#2756b6",
              },
            }}
          >
            Back to Faqs
          </Button>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            bgcolor: "white",
            display: "flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (id !== "create") {
                handleEditFaq(values);
              } else {
                handleNewFaq(values);
              }
            }}
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
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Question"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.question}
                    name="question"
                    error={!!touched.question && !!errors.question}
                    helperText={touched.question && errors.question}
                  />

                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Answers"
                    multiline
                    rows={6}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.answer}
                    name="answer"
                    error={!!touched.answer && !!errors.answer}
                    helperText={touched.answer && errors.answer}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  disabled={!isValid || (!dirty && id === "create") || loading}
                  sx={{
                    textTransform: "none",
                    bgcolor:
                      !isValid || (!dirty && id === "create") || loading
                        ? "#0000001f"
                        : "#4e97fd",
                    color: "white",
                    fontSize: "16px",
                    paddingX: "25px",
                    fontWeight: 600,
                    paddingY: "5px",
                    alignSelf: "start",
                    borderRadius: "8px",
                    alignItems: "center",

                    "&:hover": {
                      backgroundColor: "#2756b6",
                    },
                  }}
                >
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Box>
  );
};
const validationSchema = yup.object({
  question: yup
    .string()
    .required("required")
    .min(3, "Name must be at least 8 characters"),
  answer: yup
    .string()
    .required("required")
    .min(3, "Name must be at least 8 characters"),
});
export default AddFaq;
