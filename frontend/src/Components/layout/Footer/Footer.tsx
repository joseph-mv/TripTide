import { Link } from "react-router-dom";

import "./Footer.css";


const Footer = () => {
  // Footer navigation links
  const footerLinks = [
    { label: 'About Us', path: '/about', isInternal: true },
    { label: 'Contact', path: '/contact', isInternal: true },
    { label: 'Privacy & Policy', path: '#privacy', isInternal: false },
    { label: 'Terms & Service', path: '#terms', isInternal: false },
  ];

  // Social media platforms with icons (Font Awesome)
  const socialLinks = [
    { iconClass: 'fab fa-facebook-f', url: 'https://facebook.com' },
    { iconClass: 'fab fa-twitter', url: 'https://twitter.com' },
    { iconClass: 'fab fa-instagram', url: 'https://instagram.com' },
  ];
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo */}
        <div className="footer-logo">
          <h1>TripTide</h1>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <ul>
            {footerLinks.map(({ label, path, isInternal }) => (
              <li key={label}>
                {isInternal ? (
                  <Link to={path}>{label}</Link>
                ) : (
                  <a href={path}>{label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          {socialLinks.map(({ iconClass, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={iconClass}></i>
            </a>
          ))}
        </div>

        {/* Info */}
        <div className="footer-info">
          <p>
            &copy; {new Date().getFullYear()} TripTide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
