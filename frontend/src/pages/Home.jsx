import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Facilities from '../components/Facilities'

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Hero />
      <Categories />
      <br /><hr /><br />
      <Slider />
      <br />
      <Products />
      <br />
      <Facilities />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home