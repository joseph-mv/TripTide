import React from 'react'
import Header from '../Components/Header/Header'
import Hero from '../Components/Hero/Hero'
import PopularDestinations  from'../Components/PopularDestinations/PopularDestinations'
import Features from'../Components/Features/Features'
import Footer from '../Components/Footer/Footer'



function Home() {
  return (
    <div>
      <Header />
      <Hero />
    <Features />
    <PopularDestinations />
    
    <Footer />
    </div>
  )
}

export default Home
