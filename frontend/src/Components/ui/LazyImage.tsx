import { useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";


interface LazyImageProps {
  imageUrl: string;
  name?: string;
  error?: boolean;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const LazyImage: React.FC<LazyImageProps> = ({ imageUrl, name, error, className, width = "100%", height = 'auto' }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <>
      {loading && !error && imageUrl && (
        <div ><i style={{ width: '20px', fontSize: '2.2rem', margin: '10% 45%' }} className="fas fa-spinner fa-spin"></i> </div>
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
