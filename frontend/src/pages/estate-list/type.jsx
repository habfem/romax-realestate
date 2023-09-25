import { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { CustomDivider } from "./filter";

const Type = () => {
  const propertyType = [
    "Detached",
    "Semi-detached",
    "Terraced",
    "Flat",
    "Bungalow",
    "Park Home",
  ];
  const filter = ["Swimming Pool", "Garden", "Parking", "Generator"];
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontSize="15px">
          PROPERTY TYPE
        </Typography>
        <FormGroup>
          {propertyType.map((type, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }} />
              }
              label={type}
            />
          ))}
        </FormGroup>
      </Stack>
      <CustomDivider />
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontSize="15px">
          FILTERS
        </Typography>
        <FormGroup>
          {filter.map((type, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }} />
              }
              label={type}
            />
          ))}
        </FormGroup>
      </Stack>
    </>
  );
};

export default Type;
