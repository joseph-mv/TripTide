import { useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImageSkeleton } from "./ImageSkeleton";


interface LazyImageProps {
  imageUrl: string;
  name?: string;
  error?: boolean;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const LazyImage: React.FC<LazyImageProps> = ({ imageUrl, name, error, className, width = "100%", height = 'auto' }) => {
 
  return (
      <LazyLoadImage
        placeholder={<ImageSkeleton width={width} height={height} />}
        placeholderSrc="/bg_image/about1.webp"
        src={imageUrl}
        className={className}
        width={width}
        height={height}
        effect="blur"
        alt={name}
      />
  );
};

export default LazyImage;
