import React from 'react'
import classes from "./newsletter.module.css"
import { FiSend } from "react-icons/fi"

const Newsletter = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Want to get the latets deals?</h5>
          <h2>Send us an email and we will be in touch</h2>
        </div>
        <div className={classes.inputContainer}>
          <input type="email" placeholder="Enter your email..." />
          <FiSend className={classes.sendIcon} />
        </div>
      </div>
    </div>
  )
}

export default Newsletter