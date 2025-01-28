import React from 'react'
import Header from '../Components/Header/Header'
import Destinations from '../Components/Destinations/Destinations'
import Footer from "../Components/Footer/Footer";
import BackToTop from "../Components/BackToTop/BackToTop";

function DestinationsPage() {
  return (
    <div>
        <Header/>
        <Destinations/>
        <BackToTop/>
        <Footer/>
    </div>
  )
}

export default DestinationsPage