import React from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Product from '../components/Product'
import SocialProofSection from '../components/SocialProofSection'
import Footer from '../components/Footer'
const LandingPages = () => {
  return (
    <>
    <Nav/>
    <Hero/>
  <hr />
    <Product/>
    <hr />
    <SocialProofSection/>
    <hr />
    
    <Footer/>
    </>
  )
}

export default LandingPages