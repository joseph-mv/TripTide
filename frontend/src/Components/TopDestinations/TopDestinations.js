import React, { useEffect, useState } from 'react';
import './TopDestinations.css'; // Assuming you have separate CSS for TopDestinations
import axios from 'axios';
import mustVisitPlaces from '../../utils/mustVisitPlaces';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const TopDestinations = () => {
  // var destinations = [
  //   {
  //     name: 'Paris',
  //     image: 'path/to/paris.jpg',
  //     description: 'The city of light with stunning architecture and rich history.',
  //   },
  //   {
  //     name: 'New York',
  //     image: 'path/to/new-york.jpg',
  //     description: 'The bustling city with iconic landmarks and diverse culture.',
  //   },
  //   {
  //     name: 'Tokyo',
  //     image: 'path/to/tokyo.jpg',
  //     description: 'A vibrant metropolis blending traditional culture with modern innovation.',
  //   },
  //   {
  //     name: 'Sydney',
  //     image: 'path/to/sydney.jpg',
  //     description: 'Famous for its beautiful harbor and stunning beaches.',
  //   },
  //   {
  //     name: 'Rome',
  //     image: 'path/to/rome.jpg',
  //     description: 'Rich in history with ancient ruins and beautiful architecture.',
  //   },
  //   {
  //     name: 'Cape Town',
  //     image: 'path/to/cape-town.jpg',
  //     description: 'A diverse city with breathtaking landscapes and rich cultural experiences.',
  //   },
  //   {
  //     name: 'Barcelona',
  //     image: 'path/to/barcelona.jpg',
  //     description: 'Known for its unique architecture and vibrant nightlife.',
  //   },
  //   {
  //     name: 'Istanbul',
  //     image: 'path/to/istanbul.jpg',
  //     description: 'A city that straddles two continents with a rich history and diverse culture.',
  //   },
  //   {
  //     name: 'Dubai',
  //     image: 'path/to/dubai.jpg',
  //     description: 'Modern city with luxurious experiences and stunning skyscrapers.',
  //   },
  //   {
  //     name: 'Amsterdam',
  //     image: 'path/to/amsterdam.jpg',
  //     description: 'Known for its picturesque canals, museums, and lively atmosphere.',
  //   },
  //   // Add more destinations here if needed
  // ];

  const [destinations, setDestinations] = useState([]);
  useEffect(() => {

  const fetchPlaces = async () => {
    try {
    
      
      const randomIndex = Math.floor(Math.random() *( mustVisitPlaces.length-25));
      const placeToVisit=mustVisitPlaces.slice(randomIndex, randomIndex + 25)
     
      // Use Promise.all to wait for all the Wikipedia requests to complete
      const places = await Promise.all(
        placeToVisit.map(async (destination, index) => {
          console.log((destination))
          try {
            const wikiResponse = await axios.get(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${destination.name}`
            );
            console.log((wikiResponse))
            return {
              name: wikiResponse.data.title,
              description: wikiResponse.data.description,
              extract: wikiResponse.data.extract,
              image: wikiResponse.data.originalimage,
              coordinates: wikiResponse.data.coordinates
            };
          } catch (error) {
            console.error(`Error fetching Wikipedia summary for index ${index}:`, error);
            return null; 
          }
        })
      );
     
  
      setDestinations(places.filter(place => place !== null).slice(0,12)); 
      
    } catch (e) {
      console.error('Error fetching top destinations:', e);
    }
  };
  
  fetchPlaces();
  
  }, [])
  // console.log((destinations))
  const [flipped, setFlipped] = useState(Array(10).fill(false)); 

  const handleFlip = (index) => {
    console.log((index))
    console.log((flipped))
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };
  return (
    <section className="top-destinations">
      <h2 className="top-destinations-heading">Top Destinations</h2>
      <div className="destination-grid">
      {destinations.map((destination, index) => (
          <div
            key={index}
            className={`destination-card ${flipped[index] ? 'flipped' : ''}`}
            onClick={() => handleFlip(index)}
          >
            <div className="destination-card-inner">
              <div className="destination-card-front">
              <h3 className="destination-name">{destination.name}</h3>
              <div class="image-container">
                <img src={destination.image?.source} alt={destination.name} className="destination-image" />
               <p className="destination-description">{destination.description}</p>
               </div>
              </div>
              <div className="destination-card-back">
                <h3 className="destination-name">{destination.name}</h3>
                <p className="destination-details">{destination.extract}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDestinations;
