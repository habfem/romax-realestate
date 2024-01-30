import React, { useState, useEffect } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import axios from 'axios';
import CategoryItem from './CategoryItem';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const isNonMobile = useMediaQuery('(min-width:968px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      {categories.map((cat) => (
        <Grid item xs={12} sm={6} md={4} key={cat.id}>
          <CategoryItem {...cat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
