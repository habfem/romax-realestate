import React, { useState } from 'react'
import classes from "./hero.module.css"
import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const [type, setType] = useState("beach");
  const [continent, setContinent] = useState("0");
  const [priceRange, setPriceRange] = useState("0");

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/properties?type=${type}&continent=${continent}&priceRange=${priceRange}`)
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let us find your dream place right now</h2>
        <h5>Search the best selection of luxury real estate</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select type</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="village">Village</option>
            <option value="island">Island</option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select Price Range</option>
            <option value="0">0 - 25,000,000</option>
            <option value="1">25,000,000 - 50,000,000</option>
            <option value="2">50,000,000 - 75,000,000</option>
            <option value="3">75,000,000 - 100,000,000</option>
            <option value="4">100,000,000 and up</option>
          </select>
          <select onChange={(e) => setContinent(e.target.value)}>
            <option disabled>Select Continent</option>
            <option value="0">Africa</option>
            <option value="1">Asia</option>
            <option value="2">Europe</option>
            <option value="3">North America</option>
            <option value="4">South America</option>
            <option value="5">Australia</option>
            <option value="6">Antartica</option>
          </select>
          <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon} />
        </div>
      </div>
    </div>
  )
}

export default Hero