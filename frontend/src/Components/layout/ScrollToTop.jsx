import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component for navigating between pages.
 * Automatically scrolls to top when the route changes.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
