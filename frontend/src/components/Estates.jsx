import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios"
import Estate from "./Estate";
import Loader from './Loader';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 40px;
  fontweight: 300;
  text-align: center; /* Center-align the text */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Estates = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `https://romax-real-estate.onrender.com/api/estate?catgory=${cat}` : "https://romax-real-estate.onrender.com/api/estate")
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    getProducts()
  }, [cat]);

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item => Object.entries(filters).every(([key, value]) =>
        item[key].includes(value)
      ))
    )
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <Title>ESTATE</Title>
      <Container>
        {loading ? ( // Display Loader component when loading is true
          <Loader />
        ) : (
          cat
            ? filteredProducts.map((item) => <Estate item={item} key={item.id} />)
            : products
              .slice(0, 8)
              .map((item) => <Estate item={item} key={item.id} />)
        )}
      </Container>
    </>
  );
};

export default Estates;