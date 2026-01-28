import { useDispatch } from "react-redux";

import Hero from "../Components/home/Hero/Hero";
import FeatureSection from "../Components/home/Features/Features";
import TopDestinations from "../Components/home/TopDestinations/TopDestinations";

/**
 *
 * Home page of Triptide
 */
function Home() {
  const dispatch = useDispatch();

  //reset trip plan form
  dispatch({
    type: "RESET_FORM",
  });

  return (
    <div>
      <Hero />
      <FeatureSection />
      <TopDestinations />
    </div>
  );
}

export default Home;
