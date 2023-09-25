import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import SavedCard from "./SavedCard";
import { userRequest } from "../../requestMethods";

const SavedProperties = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await userRequest.get(`users/user-saved-properties`);
        setProperties(res.data.savedProperties);
      } catch (error) {
        console.log(error);
      }
    };
    getProperties();
  }, []);
  return (
    <Box>
      {properties.length > 0 ? (
        <Grid container spacing={3}>
          {properties?.map((p, index) => (
            <Grid key={index} item sm={4}>
              <SavedCard {...p} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" textAlign="center" mt={4}>NO PROPERTY SAVED</Typography>
      )}
    </Box>
  );
};

export default SavedProperties;
