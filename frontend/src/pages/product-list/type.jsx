import { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { CustomDivider } from "./index";

const Type = ({selectedTypes, setSelectedTypes}) => {

  const propertyType = [
    "Detached",
    "Semi-detached",
    "Terraced",
    "Flat",
    "Bungalow",
    "Park Home",
  ];

  const handleRatingChange = (event) => {
    const type = event.target.value;
    if (event.target.checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter((id) => id !== type));
    }
  };
  console.log(selectedTypes)
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
                <Checkbox
                value={type}
                onChange={handleRatingChange}
                checked={selectedTypes.includes(type)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }} />
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
