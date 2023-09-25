import {
  Box,
  Stack,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { CustomDivider } from "./filter";

const Range = () => {
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontSize="15px">
          PRICE RANGE
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <FormControl
            size="small"
            sx={{
              flex: 1,
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="highest-price"
            >
              <MenuItem value={"highest-price"}>Min Price</MenuItem>
              <MenuItem value={"lowest-price"}>₦10,000,000</MenuItem>
              <MenuItem value={"newest-price"}>₦20,000,000</MenuItem>
              <MenuItem value={"oldest-price"}>₦30,000,000</MenuItem>
            </Select>
          </FormControl>
          <Typography>to</Typography>
          <FormControl
            size="small"
            sx={{
              flex: 1,
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="highest-price"
            >
              <MenuItem value={"highest-price"}>Max Price</MenuItem>
              <MenuItem value={"lowest-price"}>₦10,000,000</MenuItem>
              <MenuItem value={"newest-price"}>₦20,000,000</MenuItem>
              <MenuItem value={"oldest-price"}>₦30,000,000</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <CustomDivider />

      <Stack spacing={2}>
        <Typography variant="subtitle1" fontSize="15px">
          BEDROOMS
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <FormControl
            size="small"
            sx={{
              flex: 1,
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="highest-price"
            >
              <MenuItem value={"highest-price"}>Min Beds</MenuItem>
              <MenuItem value={"lowest-price"}>1 Bed</MenuItem>
              <MenuItem value={"newest-price"}>2 Beds</MenuItem>
              <MenuItem value={"oldest-price"}>3 Beds</MenuItem>
            </Select>
          </FormControl>
          <Typography>to</Typography>
          <FormControl
            size="small"
            sx={{
              flex: 1,
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="highest-price"
            >
              <MenuItem value={"highest-price"}>Max Beds</MenuItem>
              <MenuItem value={"lowest-price"}>2 Bed</MenuItem>
              <MenuItem value={"newest-price"}>3 Beds</MenuItem>
              <MenuItem value={"oldest-price"}>4 Beds</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <CustomDivider />


      <Stack spacing={2}>
        <Typography variant="subtitle1" fontSize="15px">
          CAR PARKING
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <FormControl
            size="small"
            sx={{
              flex: 1,
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="highest-price"
            >
              <MenuItem value={"highest-price"}>Min Cars</MenuItem>
              <MenuItem value={"lowest-price"}>1 Car</MenuItem>
              <MenuItem value={"newest-price"}>2 Cars</MenuItem>
              <MenuItem value={"oldest-price"}>3 Cars</MenuItem>
            </Select>
          </FormControl>
          <Typography>to</Typography>
          <FormControl
            size="small"
            sx={{
              flex: 1,
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="highest-price"
            >
              <MenuItem value={"highest-price"}>Max Cars</MenuItem>
              <MenuItem value={"lowest-price"}>2 Cars</MenuItem>
              <MenuItem value={"newest-price"}>3 Cars</MenuItem>
              <MenuItem value={"oldest-price"}>4 Cars</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </>
  );
};

export default Range;
