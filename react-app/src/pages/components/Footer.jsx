import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import bannerImage from "../../images/banner.png";

import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const Footer = () => {
  const authenticated = false;
  const ref = useRef(null);
  const target = useInView(ref, { once: true });
  const animate = useAnimation();
  const transition = {
    duration: 0.5,
    delay: 0.1,
  };
  useEffect(() => {
    if (target) {
      animate.start("end");
    }
  }, [target,animate]);
  return (
    <motion.footer className="main-footer"
    ref={ref}
      variants={{
        start: {
          opacity: 0,
          scale: 0.8,
          x: -100,
        },
        end: {
          opacity: 1,
          scale: 1,
          x: 0,
        },
      }}
      initial="start"
      animate={animate}
      transition={transition}
    >
      <div className="top">
        <img src={bannerImage} alt="" />
        
      </div>
      <div className="middel">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to='about-us'>About Us</Link>
          </li>
          <li>
            <Link to='contact-us'>Contact Us</Link>
          </li>
          {!authenticated ? (
            <>
              <li>
                <Link>Login</Link>
              </li>
              <li>
                <Link>Sign Up</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="bottom">
        <div className="col">
          <FaFacebookSquare className="footer-icon"></FaFacebookSquare>
          <FaInstagramSquare className="footer-icon"></FaInstagramSquare>
          <FaWhatsappSquare className="footer-icon"></FaWhatsappSquare>
        </div>
        <div className="col">
          <h5>
            Copyright 2023@{" "}
            <a href="https://github.com/hamza-essalhi/">Hamza Essalhi</a> |{" "}
            <a href="https://github.com/IsmailR1bii?">Ismail Rabii</a>
          </h5>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
