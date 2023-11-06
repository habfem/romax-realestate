import {
  Select,
  MenuItem,
  FormControl,
  Stack,
  Typography,
  InputLabel,
  Button,
} from "@mui/material";
import {
  setLocation,
  setMinPrice,
  setMaxPrice,
  setMinBed,
  setMaxBed,
  setMinCar,
  setMaxCar,
  setType,
} from "../redux/filter";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { prices, numbers, getLocations, getPropertyType } from "../data";

const FilterComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <Typography
                variant="h5"
                mb={3}
                fontSize={{ xs: "20px", lg: "25px" }}
                letterSpacing="1px"
                textAlign="center"
              >
                FILTER PROPERTIES
              </Typography>
    <Stack spacing={2.5}>
      <Stack direction="row" spacing={1} alignItems="center">
        <FormControl
          sx={{
            flex: 1,
          }}
        >
          <InputLabel>Min-Price</InputLabel>
          <Select
            label="Min-Price"
            id="demo-simple-select"
            onChange={(e) => {
              dispatch(setMinPrice(e.target.value));
            }}
            sx={{
              borderRadius: "10px",
            }}
          >
            {prices.map((price) => (
              <MenuItem value={price}>{`₦${price.toLocaleString()}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography>-</Typography>
        <FormControl
          sx={{
            flex: 1,
          }}
        >
          <InputLabel>Max-Price</InputLabel>

          <Select
            label="Max-Price"
            id="demo-simple-select"
            onChange={(e) => {
              dispatch(setMaxPrice(e.target.value));
            }}
            sx={{
              borderRadius: "10px",
            }}
          >
            {prices.map((price) => (
              <MenuItem value={price}>{`₦${price.toLocaleString()}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <FormControl
          sx={{
            flex: 1,
          }}
        >
          <InputLabel>Min-Bed</InputLabel>

          <Select
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
          sx={{
            flex: 1,
          }}
        >
          <InputLabel>Max-Bed</InputLabel>

          <Select
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
      <Stack direction="row" spacing={1} alignItems="center">
        <FormControl
          sx={{
            flex: 1,
          }}
        >
          <InputLabel>Min-Car</InputLabel>

          <Select
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
          sx={{
            flex: 1,
          }}
        >
          <InputLabel>Max-Car</InputLabel>

          <Select
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
      <FormControl>
        <InputLabel>Property Type</InputLabel>

        <Select
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
      <FormControl>
        <InputLabel>Location</InputLabel>

        <Select
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

      <Button
        onClick={() => navigate("/products")}
        sx={{
          textTransform: "none",
          bgcolor: "primary.main",
          color: "white",
          // fontSize: "18px",
          paddingX: "20px",
          // fontWeight: 600,
          paddingY: "10px",
          alignSelf: "start",
          display: "flex",
          gap: "5px",
          borderRadius: "16px",
          "&:hover": {
            backgroundColor: "#fc973f",
          },
        }}
      >
        <Typography variant="subtitle1" letterSpacing="1px">
          {" "}
          Quick Search
        </Typography>
      </Button>
    </Stack>
    </>
  );
};

export default FilterComponent;
