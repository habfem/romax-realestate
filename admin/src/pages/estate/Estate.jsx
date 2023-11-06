import React from "react";
import { Box, Paper, Stack, styled, Typography, Button, TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./estate.css";

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

export default function Estate() {
  const location = useLocation();
  const estateId = location.pathname.split("/")[2];

  const estate = useSelector((state) =>
    state.estate.estates.find((estate) => estate._id === estateId)
  );

  return (
    <Box px={{ xs: 2, md: 4 }} style={{ width: "80%", height: "100vh" }}>
      <Stack spacing={3}>
        <Stack
          justifyContent="space-between"
          direction={{ xs: "column", sm: "row" }}
          rowGap={{ xs: 2, sm: 0 }}
        >
          <Typography variant="h6" fontSize={{ xs: "19px", sm: "21px" }}>
            Estate
          </Typography>
          <Link to="/newEstate">
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#4e97fd",
                color: "white",
                fontSize: "16px",
                paddingX: "15px",
                fontWeight: 600,
                paddingY: "10px",
                alignSelf: "stretch",
                borderRadius: "10px",
                alignItems: "center",
                width: "auto",
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
          <form>
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Estate Title"
              defaultValue={estate.title}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Estate Description"
              defaultValue={estate.desc}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Location"
              defaultValue={estate.location}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="House"
              defaultValue={estate.house}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Categories"
              defaultValue={estate.categories}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Features"
              defaultValue={estate.features}
            />
            <br />
            <br />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Image"
              defaultValue={estate.img}
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
