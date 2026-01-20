import { useEffect, useRef } from "react";

import "./Features.css";
import FeatureCard from "./FeatureCard/FeatureCard";
import { features } from "../../../config/featuresConfig";

/**
 * feature section in Home page with horizontal scrolling
 */
const FeatureSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  /** Add custom horizontal wheel scrolling to scrollContainer */
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      // Horizontal scroll wheel event
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY;
        }
      };

      scrollContainer.addEventListener("wheel", handleWheel);

      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel); //unmount event
      };
    }
  }, []);
  return (
    <div className="feature-section">
      <h2 className="feature-heading">Our Features</h2>
      <div className="feature-scroll" ref={scrollRef}>

        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}

      </div>
    </div>
  );
};

export default FeatureSection;
