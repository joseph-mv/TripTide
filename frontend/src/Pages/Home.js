import React from "react";
import Header from "../Components/Header/Header";
import Hero from "../Components/Hero/Hero";
import TopDestinations from "../Components/TopDestinations/TopDestinations";
import Features from "../Components/Features/Features";
import Footer from "../Components/Footer/Footer";
import BackToTop from "../Components/BackToTop/BackToTop";

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <TopDestinations />
      <BackToTop/>
      <Footer />
    </div>
  );
}

export default Home;
