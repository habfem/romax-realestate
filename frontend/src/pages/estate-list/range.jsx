import {
  Box,
  Stack,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { CustomDivider } from "./index";

const Range = ({
  setMaxPrice,
  setMinPrice,
  minPrice,
  maxPrice,
  minBed,
  setMaxBed,
  setMinBed,
  maxBed,
  minCar,
  setMaxCar,
  setMinCar,
  maxCar,
}) => {
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
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
              }}
            >
              <MenuItem value={10000}>Min Price</MenuItem>
              <MenuItem value={10000000}>₦10,000,000</MenuItem>
              <MenuItem value={20000000}>₦20,000,000</MenuItem>
              <MenuItem value={30000000}>₦30,000,000</MenuItem>
              <MenuItem value={40000000}>₦40,000,000</MenuItem>
              <MenuItem value={50000000}>₦50,000,000</MenuItem>
              <MenuItem value={60000000}>₦60,000,000</MenuItem>
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
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
            >
              <MenuItem value={1000000000}>Max Price</MenuItem>
              <MenuItem value={10000000}>₦10,000,000</MenuItem>
              <MenuItem value={20000000}>₦20,000,000</MenuItem>
              <MenuItem value={30000000}>₦30,000,000</MenuItem>
              <MenuItem value={40000000}>₦40,000,000</MenuItem>
              <MenuItem value={50000000}>₦50,000,000</MenuItem>
              <MenuItem value={60000000}>₦60,000,000</MenuItem>
              <MenuItem value={70000000}>₦70,000,000</MenuItem>
              <MenuItem value={80000000}>₦80,000,000</MenuItem>
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
              value={minBed}
              onChange={(e) => {
                setMinBed(e.target.value);
              }}
            >
              <MenuItem value={0}>Min Beds</MenuItem>
              <MenuItem value={1}>1 Bed</MenuItem>
              <MenuItem value={2}>2 Beds</MenuItem>
              <MenuItem value={3}>3 Beds</MenuItem>
              <MenuItem value={4}>4 Beds</MenuItem>
              <MenuItem value={5}>5 Beds</MenuItem>
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
              value={maxBed}
              onChange={(e) => {
                setMaxBed(e.target.value);
              }}
            >
              <MenuItem value={10}>Max Beds</MenuItem>
              <MenuItem value={2}>2 Bed</MenuItem>
              <MenuItem value={3}>3 Beds</MenuItem>
              <MenuItem value={4}>4 Beds</MenuItem>
              <MenuItem value={5}>5 Beds</MenuItem>
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
              value={minCar}
              onChange={(e) => {
                setMinCar(e.target.value);
              }}
            >
              <MenuItem value={0}>Min Cars</MenuItem>
              <MenuItem value={1}>1 Car</MenuItem>
              <MenuItem value={2}>2 Cars</MenuItem>
              <MenuItem value={3}>3 Cars</MenuItem>
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
              value={maxCar}
              onChange={(e) => {
                setMaxCar(e.target.value);
              }}
            >
              <MenuItem value={10}>Max Cars</MenuItem>
              <MenuItem value={2}>2 Cars</MenuItem>
              <MenuItem value={3}>3 Cars</MenuItem>
              <MenuItem value={4}>4 Cars</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </>
  );
};

export default Range;
