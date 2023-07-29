import classes from "./popularproperties.module.css";
import { Link } from "react-router-dom";
import img1 from "../../assests/beach-house.jpg"
import img2 from "../../assests/mountain-house.jpg"
import img3 from "../../assests/village-house.jpg"
import img4 from "../../assests/island.jpg"
import { useEffect, useState } from "react";
import { request } from "../../util/fetchAPI";

const PopularProperties = () => {
  const [numProperties, setNumProperties] = useState({})

  useEffect(() => {
    const fetchNewProperties = async () => {
      try {
        const data = await request("/property/find/types", "GET")
        setNumProperties(data);
      }
      catch (error) {
        console.error(error.message)
      }
    }
    fetchNewProperties()
  }, [])
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of properties</h5>
          <h2>Best type of properties for you</h2>
        </div>
        <div className={classes.properties}>
          <Link className={classes.property} to={`/properties?type=beach&continent=0&priceRange=2`}>
            <img src={img1} alt="Beach properties" />
            <div className={classes.quantity}>{numProperties?.beach} properties</div>
            <h5>Beach properties</h5>
          </Link>
          <Link className={classes.property} to={`/properties?type=beach&continent=0&priceRange=2`}>
            <img src={img2} alt="Mountain properties" />
            <div className={classes.quantity}>{numProperties?.mountain} properties</div>
            <h5>Mountain properties</h5>
          </Link>
          <Link className={classes.property} to={`/properties?type=beach&continent=0&priceRange=2`}>
            <img src={img3} alt="Village properties" />
            <div className={classes.quantity}>{numProperties?.village} properties</div>
            <h5>Village properties</h5>
          </Link>
          <Link className={classes.property} to={`/properties?type=beach&continent=0&priceRange=2`}>
            <img src={img4} alt="Island properties" />
            <div className={classes.quantity}>{numProperties?.island} properties</div>
            <h5>Island properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties