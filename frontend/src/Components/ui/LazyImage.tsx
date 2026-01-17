import { useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

/**
 * 
 * @param {object} props - The component's props.
 * @param {string} props.imageUrl - The URL of the image to load.
 * @param {string} [props.name] - An optional alt text for the image. Defaults to an empty string.
 * @param {boolean} [props.error] - True or false.
 * @param {string} [props.className] - An optional CSS class name to apply to the image element.
 * @param {string | number} [props.width="100%"] - The width of the image. Can be a CSS unit (e.g., "100%", "300px") or a number (interpreted as pixels). Defaults to "100%".
 * @param {string | number} [props.height='auto'] - The height of the image. Can be a CSS unit or 'auto'. Defaults to 'auto'.
 *
 */
const LazyImage = ({ imageUrl, name, error,className, width="100%",height='auto' }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <>
      {loading && !error && imageUrl && (
         <div ><i style={{width:'20px',fontSize:'2.2rem',margin:'10% 45%'}} className="fas fa-spinner fa-spin"></i> </div>
      )}
     
      <LazyLoadImage
        src={imageUrl}
        className={className}
        width={width}
        height={height}
        effect="blur"
        alt={name}
        onLoad={handleImageLoad}
        onError={handleImageLoad}
      />
    </>
  );
};

export default LazyImage;
