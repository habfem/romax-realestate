import React, { useEffect, useState } from 'react';
import classes from "./FeaturedProperties.module.css";
import { request } from '../../util/fetchAPI';
import img from "../../assests/estate5.jpg";
import person from "../../assests/person.png";
import { Link } from "react-router-dom";
import { FaBed, FaSquareFull } from "react-icons/fa";

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request("/property/find/featured", "GET")
        setFeaturedProperties(data)
      }
      catch (error) {
        console.error(error.message)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Properties you may like</h5>
          <h2>Our Featured Properties</h2>
        </div>
        <div className={classes.featuredProperties}>
          {featuredProperties?.map((property) => (
            <div key={property._id} className={classes.featuredProperty}>
              <Link to={`/propertyDetail/${property._id}`} className={classes.imgContainer}>
                <img src={property.img ? `https://romax-real-estate.onrender.com/images/${property.img}` : img} alt="" />
                {/*<img src={img} alt="" />*/}
              </Link>
              <div className={classes.details}>
                <div className={classes.priceAndOwner}>
                  <span className={classes.price}>₦ {property?.price}</span>
                  <img src={person} className={classes.owner} alt="" />
                </div>
                <div className={classes.moreDetails}>
                  <span>{property?.beds} beds <FaBed className={classes.icon} /></span>
                  <span>{property?.sqmeters} square meters <FaSquareFull className={classes.icon} /></span>
                </div>
                <div className={classes.desc}>
                  {property?.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProperties