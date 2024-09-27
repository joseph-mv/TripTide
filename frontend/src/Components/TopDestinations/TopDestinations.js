import React, { useEffect, useState } from "react";
import "./TopDestinations.css"; // Assuming you have separate CSS for TopDestinations
import axios from "axios";
import mustVisitPlaces from "../../utils/mustVisitPlaces";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const TopDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(Array(12).fill(false));
  const [imageLoading, setImageLoading] = useState(Array(12).fill(true));

  useEffect(() => {
    const fetchPlaces = async () => {
      // console.log('Fetching')
      try {
        const randomIndex = Math.floor(
          Math.random() * (mustVisitPlaces.length - 25)
        );
        const placeToVisit = mustVisitPlaces.slice(
          randomIndex,
          randomIndex + 25
        );
        // Use Promise.all to wait for all the Wikipedia requests to complete
        const places = await Promise.all(
          placeToVisit.map(async (destination, index) => {
            try {
              const wikiResponse = await axios.get(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${destination.name}`
              );
              return {
                name: wikiResponse.data.title,
                description: wikiResponse.data.description,
                extract: wikiResponse.data.extract,
                image: wikiResponse.data.thumbnail,
                coordinates: wikiResponse.data.coordinates,
              };
            } catch (error) {
              console.error(
                `Error fetching Wikipedia summary for index ${index}:`,
                error
              );
              return null;
            }
          })
        );
        setDestinations(places.filter((place) => place !== null).slice(0, 12)); 
      } catch (e) {
        console.error("Error fetching top destinations:", e);
      }finally{
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);
  // console.log(destinations);
// if(destinations.length > 0)  
  const handleImageLoad = (index) => {
    setImageLoading((prevLoading) =>
      prevLoading.map((loadingState, i) => (i === index ? false : loadingState))
    );
  };

  const handleImageError = (index) => {
    setImageLoading((prevLoading) =>
      prevLoading.map((loadingState, i) => (i === index ? false : loadingState))
    );
  };
  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };
  return (
    <section className="top-destinations">
      <h2 className="top-destinations-heading">Top Destinations</h2>
      {loading && <div className="loader"></div>}

      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <div data-aos="fade-up">
            <div
              key={index}
              className={`destination-card ${flipped[index] ? "flipped" : ""}`}
              onClick={() => handleFlip(index)}
            >
              <div className="destination-card-inner">
                <div className="destination-card-front">
                  <h3 className="destination-name">{destination.name}</h3>
                  <div class="image-container">
                    {imageLoading[index] && (
                      <div className="spinner">Loading...</div>
                    )}
                    <LazyLoadImage
                      src={destination.image?.source}
                      alt={destination.name}
                      className="destination-image"
                      effect="blur"
                      width="100%"
                      height="150px"
                      visibleByDefault={true}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                    />
                    <p className="destination-description">
                      {destination.description}
                    </p>
                  </div>
                </div>
                <div className="destination-card-back">
                  <h3 className="destination-name">{destination.name}</h3>
                  <p className="destination-details">{destination.extract}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDestinations;
