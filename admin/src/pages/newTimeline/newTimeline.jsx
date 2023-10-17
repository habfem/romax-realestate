import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTimeline } from "../../redux/apiCalls";
import {
  Box,
  Paper,
  Stack,
  TextField,
  styled,
  Typography,
  Button,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

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

export default function NewTimeline() {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [dateText, setDateText] = useState("");
  const [color, setColor] = useState("#fff");
  const [background, setBackground] = useState("#76bb7f");
  const [loading, setLoading] = useState(false);

  // Add validation state for each input
  const [isFormValid, setIsFormValid] = useState(false);

  // Function to validate the form
  const validateForm = () => {
    // Check if all input fields are filled
    const isValid =
      title.trim() !== "" &&
      subtitle.trim() !== "" &&
      paragraph.trim() !== "" &&
      paragraph2.trim() !== "" &&
      dateText.trim() !== "" &&
      color.trim() !== "" &&
      background.trim() !== "";
    setIsFormValid(isValid);
  };

  // Listen for changes in input fields and validate the form
  React.useEffect(() => {
    validateForm();
  }, [title, subtitle, paragraph, paragraph2, dateText, color, background]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTimeline = {
      title,
      subtitle,
      paragraph,
      paragraph2,
      dateText,
      color,
      background,
    };

    setLoading(true);
    try {
      await addTimeline(newTimeline, dispatch);
      setLoading(false);
      navigate("/timelines");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Box px={{ xs: 2, md: 4 }} style={{ width: "80%", height: "100vh" }}>
      <Stack spacing={3}>
        <Stack
          justifyContent="space-between"
          direction={{ xs: "column", sm: "row" }}
          rowGap={{ xs: 2, sm: 0 }}
        // alignItems="center"
        >
          <Typography variant="h6" fontSize={{ xs: "19px", sm: "21px" }}>
            New Timeline
          </Typography>
          <Button
            onClick={() => navigate("/timelines")}
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
            Back to Timelines
          </Button>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Sub-Title"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Paragraph"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              required
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Paragraph 2"
              value={paragraph2}
              onChange={(e) => setParagraph2(e.target.value)}
              required
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Date Text"
              value={dateText}
              onChange={(e) => setDateText(e.target.value)}
              required
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Background"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              required
            />
            <br />
            <br />
            <Button
              type="submit"
              disabled={!isFormValid || loading}
              sx={{
                textTransform: "none",
                bgcolor: !isFormValid || loading ? "#0000001f" : "#4e97fd",
                color: "white",
                fontSize: "16px",
                paddingX: "25px",
                fontWeight: 600,
                paddingY: "5px",
                alignSelf: "start",
                borderRadius: "8px",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: !isFormValid || loading
                    ? "#0000001f"
                    : "#2756b6",
                },
              }}
            >
              Create
            </Button>
          </form>
        </Paper>
      </Stack>
    </Box>
  );
}
