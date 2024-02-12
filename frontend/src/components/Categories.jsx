import React, { useState, useEffect } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
//import axios from 'axios';
import CategoryItem from './CategoryItem';
import Loader from './Loader';
import { publicRequest } from '../requestMethods';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const isNonMobile = useMediaQuery('(min-width:968px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicRequest.get("category")
        //const response = await axios.get('https://romax-real-estate.onrender.com/api/category');
        setCategories(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        padding: isNonMobile ? 5 : 2,
        marginTop: '0 !important',
      }}
    >
      {loading ? (
        <Loader /> // Show the loader while data is being fetched
      ) : (
        categories.map((cat) => (
          <Grid item xs={12} sm={6} md={4} key={cat.id}>
            <CategoryItem {...cat} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Categories;
