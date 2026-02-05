import './style/image.css';

interface ImageSkeletonProps {
    width: string | number;
    height: string | number;
}

export const ImageSkeleton = ({ width, height }: ImageSkeletonProps) => (
    <div
      style={{ width, height }}
      className="image-skeleton"
    />
  );
  