import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImage = ({ imageUrl, name, error }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <>
      {loading && !error && imageUrl && (
        <div className="spinner">Loading...</div>
      )}
      <LazyLoadImage
        src={imageUrl}
        className="card-image"
        width="100%"
        height="auto"
        effect="blur"
        alt={name}
        onLoad={handleImageLoad}
        onError={handleImageLoad}
      />
    </>
  );
};

export default LazyImage;
