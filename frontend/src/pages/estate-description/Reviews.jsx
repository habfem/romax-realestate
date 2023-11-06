import { useState } from "react";
import { Typography, Rating, Stack, TextField, Button } from "@mui/material";

const Reviews = () => {
  const [value, setValue] = useState({ star: 0, comment: "" });

  return (
    <Stack spacing={3}>
      <Stack spacing={1.5}>
        <Typography variant="h6">Write a Review for this product</Typography>
        <form>
          <Typography>
            Your Rating <span style={{ color: "teal" }}>*</span>
          </Typography>
          <Rating
            value={value.star || 0}
            name="star"
            onChange={(event, newValue) => {
              setValue({ ...value, star: newValue });
            }}
            sx={{
              fontSize: "23px",
            }}
          />
          <Stack spacing={1}>
            <Typography>
              Your Review <span style={{ color: "teal" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              name="review"
              value={value.comment}
              onChange={(event) => {
                setValue({ ...value, comment: event.target.value });
              }}
              multiline
              rows={7}
              placeholder="Write a review here..."
              InputLabelProps={{
                style: { fontSize: "15px" },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Stack>
          <Button
            type="submit"
            sx={{
              textTransform: "none",
              bgcolor: "teal",
              color: "white",
              fontSize: "14px",
              paddingX: "20px",
              fontWeight: 500,
              paddingY: "8px",
              alignSelf: "start",
              marginTop: "30px !important",
              borderRadius: "10px",

              "&:hover": {
                backgroundColor: "#119595",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Stack>

      <Stack></Stack>
    </Stack>
  );
};
export default Reviews;
