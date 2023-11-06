import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Timelines from '../components/Timeline'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import AboutHero from '../components/AboutHero'

const About = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <AboutHero />
      <Timelines />
      <Newsletter />
      <Footer />
    </>
  )
}

export default About