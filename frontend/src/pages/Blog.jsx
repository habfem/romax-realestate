import React from 'react'
import Footer from '../components/Footer'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import HeroBlog from '../components/HeroBlog'
import BlogSection from '../components/BlogSection'
import BlogSearch from '../components/BlogSearch'
import BlogList from '../components/BlogList'
import { Grid } from '@mui/material'


const Blog = () => {
  return (
    <>
    <Announcement />
    <Navbar />
    <HeroBlog />
    <br /> <br /> 
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <BlogSection />
      </Grid>
      <Grid item xs={12} md={6} container justifyContent="center">
        <Grid item xs={0} sm={8}>
          <BlogSearch />
        </Grid>
        <Grid item xs={0} sm={8}>
          <BlogList />
        </Grid>
      </Grid>
    </Grid>
    <Newsletter />
    <Footer />
    </>
  )
}

export default Blog