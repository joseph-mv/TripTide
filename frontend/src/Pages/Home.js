import React, { Suspense ,lazy} from "react";
import Header from "../Components/Header/Header";
import Hero from "../Components/Hero/Hero";
// import TopDestinations from "../Components/TopDestinations/TopDestinations";
import Features from "../Components/Features/Features";
import Footer from "../Components/Footer/Footer";
import BackToTop from "../Components/BackToTop/BackToTop";
const TopDestinations=React.lazy(()=>import('../Components/TopDestinations/TopDestinations'))

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Suspense fallback={<div>loading...</div> }>
      <TopDestinations />
      </Suspense>
      <BackToTop/>
      <Footer />
    </div>
  );
}

export default Home;
