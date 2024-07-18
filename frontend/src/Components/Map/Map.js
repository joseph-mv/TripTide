import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import './Map.css'
const MapComponent = () => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.4512, 43.6568],
      zoom: 13
    });
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken
    });
    const origin = [-79.4512, 43.6568]; // Replace with your origin coordinates
    const destination = [-79.3832, 43.6532]; // Replace with your destination coordinates

    directions.setOrigin(origin);
    directions.setDestination(destination);

    // map.addControl(
    //   new MapboxDirections({
    //     accessToken: mapboxgl.accessToken
    //   }),
    //   'top-left'
    // );

    // Clean up
    return () => map.remove();
  }, []);

  return (
    <div className='map' >
      <div id="map" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default MapComponent;
