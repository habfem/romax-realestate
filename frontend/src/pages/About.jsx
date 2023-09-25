import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Timelines from '../components/Timeline'
import Announcement from '../components/Announcement'

const About = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <Timelines />
      <Footer />
    </>
  )
}

export default About