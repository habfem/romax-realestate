import React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import makeToast from "../../toaster";
import { updateTimeline } from "../../redux/apiCalls";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

export default function Timeline() {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timelineId = location.pathname.split("/")[2];

  const timeline = useSelector((state) =>
    state.timeline.timelines.find((timeline) => timeline._id === timelineId)
  );

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await updateTimeline(id, timeline, dispatch); // Await the updateTimeline function
      makeToast("success", "Timeline updated successfully");
      navigate("/timelines");
    } catch (error) {
      makeToast("error", "Failed to update timeline");
    }
  };

  return (
    <Box px={{ xs: 2, md: 4 }} style={{ width: "80%", height: "100vh" }}>
      <Stack spacing={3}>
        <Stack
          justifyContent="space-between"
          direction={{ xs: "column", sm: "row" }}
          rowGap={{ xs: 2, sm: 0 }}
        >
          <Typography variant="h6" fontSize={{ xs: "19px", sm: "21px" }}>
            Timeline
          </Typography>
          <Link to="/timeline/newtimeline">
            <Button
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
              Create
            </Button>
          </Link>
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
              label="Timeline Title"
              defaultValue={timeline.title}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="textarea"
              label="Timeline Subtitle"
              defaultValue={timeline.subtitle}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="textarea"
              label="Timeline Description"
              defaultValue={timeline.paragraph}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Duration"
              defaultValue={timeline.dateText}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Paragraph"
              defaultValue={timeline.paragraph2}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Color"
              defaultValue={timeline.color}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Background Color"
              defaultValue={timeline.background}
            />
            <br />
            <br />
            <Button
              type="submit"
              sx={{
                textTransform: "none",
                bgcolor: "#4e97fd",
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
              Update
            </Button>
          </form>
        </Paper>
      </Stack>
    </Box>
  );
}
