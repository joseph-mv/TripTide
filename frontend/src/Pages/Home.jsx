import React, { Suspense } from "react";
import Hero from "../Components/Hero/Hero";
import Features from "../Components/Features/Features";
const TopDestinations=React.lazy(()=>import('../Components/TopDestinations/TopDestinations'))

function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Suspense fallback={<div>loading...</div> }>
      <TopDestinations />
      </Suspense>
     
    </div>
  );
}

export default Home;
