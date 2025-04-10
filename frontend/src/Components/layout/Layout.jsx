import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ScrollToTop from "./ScrollToTop";
import BackToTop from "./BackToTop/BackToTop";

/**
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be rendered inside the component
 */
const Layout = ({ children }) => {
  //for animation while scrolling first time
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <Header />
      {children}
      <BackToTop />
      <Footer />
    </>
  );
};

export default Layout;
