import "./FeatureCard.css"; // Import the CSS file

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

/**
 * FeatureCard in Feature section
 * 
 * @param {Object} props - Component props
 * @param {string} props.icon -Icon of feature
 * @param {string} props.title -Title of feature
 * @param {string} props.description -Description of feature
 */
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="feature-card" data-aos="fade-left">
      <div className="feature-icon">
        <i className={icon}></i>
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default FeatureCard;
