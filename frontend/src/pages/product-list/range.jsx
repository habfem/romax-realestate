import { useState, useEffect } from "react";
import {
  Stack,
  FormControl,
  MenuItem,
  Select,
  Typography,
  InputLabel,
} from "@mui/material";
import { CustomDivider } from "./index";
import { useSelector, useDispatch } from "react-redux";

import {
  setMinPrice,
  setMaxPrice,
  setMinBed,
  setMaxBed,
  setMinCar,
  setMaxCar,
  setType,
  setLocation,
} from "../../redux/filter";
import { prices, numbers, getLocations, getPropertyType} from "../../data";

const Range = () => {
  const dispatch = useDispatch();
  const { minPrice, maxPrice, minBed, maxBed, minCar, maxCar, type, location } =
    useSelector((state) => state.filter);


    const [locations, setLocations] = useState([]);
  const [propertyType, setPropertyType] = useState([]);

  useEffect(() => {
    getLocations().then((data) => {
      setLocations(data);
    });
    getPropertyType().then((data) => {
      setPropertyType(data);
    });
  }, []);
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
            <InputLabel>Min-Price</InputLabel>
            <Select
              label="Min-Price"
              id="demo-simple-select"
              value={minPrice}
              onChange={(e) => {
                dispatch(setMinPrice(e.target.value));
              }}
              sx={{
                borderRadius: "10px",
              }}
            >
              {prices.map((price) => (
                <MenuItem
                  value={price}
                >{`₦${price.toLocaleString()}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography>-</Typography>
          <FormControl
            size="small"
            sx={{
              flex: 1,
            }}
          >
            <InputLabel>Max-Price</InputLabel>

            <Select
              label="Max-Price"
              id="demo-simple-select"
              value={maxPrice}
              onChange={(e) => {
                dispatch(setMaxPrice(e.target.value));
              }}
              sx={{
                borderRadius: "10px",
              }}
            >
              {prices.map((price) => (
                <MenuItem
                  value={price}
                >{`₦${price.toLocaleString()}`}</MenuItem>
              ))}
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
            <InputLabel>Min-Bed</InputLabel>

            <Select
              value={minBed}
              onChange={(e) => {
                dispatch(setMinBed(e.target.value));
              }}
              label="Min-Bed"
              sx={{
                borderRadius: "10px",
              }}
            >
              {numbers.map((no) => (
                <MenuItem value={no}>{`${no} ${
                  no === 1 ? "Bed" : "Beds"
                }`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography>-</Typography>
          <FormControl
            size="small"
            sx={{
              flex: 1,
            }}
          >
            <InputLabel>Max-Bed</InputLabel>

            <Select
              value={maxBed}
              onChange={(e) => {
                dispatch(setMaxBed(e.target.value));
              }}
              label="Max-Bed"
              sx={{
                borderRadius: "10px",
              }}
            >
              {numbers.map((no) => (
                <MenuItem value={no}>{`${no} ${
                  no === 1 ? "Bed" : "Beds"
                }`}</MenuItem>
              ))}
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
            <InputLabel>Min-Car</InputLabel>

            <Select
              value={minCar}
              onChange={(e) => {
                dispatch(setMinCar(e.target.value));
              }}
              label="Min-Car"
              sx={{
                borderRadius: "10px",
              }}
            >
              {numbers.map((no) => (
                <MenuItem value={no}>{`${no} ${
                  no === 1 ? "Car" : "Cars"
                }`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography>-</Typography>
          <FormControl
            size="small"
            sx={{
              flex: 1,
            }}
          >
            <InputLabel>Max-Car</InputLabel>

            <Select
              value={maxCar}
              onChange={(e) => {
                dispatch(setMaxCar(e.target.value));
              }}
              label="Max-Car"
              sx={{
                borderRadius: "10px",
              }}
            >
              {numbers.map((no) => (
                <MenuItem value={no}>{`${no} ${
                  no === 1 ? "Car" : "Cars"
                }`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <CustomDivider />
        <Stack spacing={2}>
          <Typography variant="subtitle1" fontSize="15px">
            PROPERTY TYPE
          </Typography>
          <FormControl size="small">
            <InputLabel>Property Type</InputLabel>

            <Select
              value={type}
              onChange={(e) => {
                dispatch(setType(e.target.value));
              }}
              label="Property Type"
              sx={{
                borderRadius: "10px",
              }}
            >
              {propertyType.map((type) => (
                <MenuItem value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <CustomDivider />

        <Stack spacing={2}>
          <Typography variant="subtitle1" fontSize="15px">
            LOCATION
          </Typography>
          <FormControl size="small">
            <InputLabel>Location</InputLabel>

            <Select
              value={location}
              onChange={(e) => {
                dispatch(setLocation(e.target.value));
              }}
              label="Location"
              sx={{
                borderRadius: "10px",
              }}
            >
              {locations.map((location) => (
                <MenuItem value={location}>{location}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </>
  );
};

export default Range;
