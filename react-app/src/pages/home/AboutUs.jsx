import { useEffect, useRef } from "react";
import userImage from "../../images/banner.png";

import { motion, useAnimation, useInView } from "framer-motion";

const AboutUs = () => {
  document.title = 'About Us';
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
  }, [target, animate]);

  return (
    <motion.div
      className="about-us"
      ref={ref}
      variants={{
        start: {
          opacity: 0,
          scale: 0.8,
          x: 100,
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
      <motion.div
        className=" col"
        variants={{
          start: {
            opacity: 0,
            y: -100,
          },
          end: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="start"
        animate={animate}
        transition={{
          duration: 0.5,
          delay: 0.4,
        }}
      >
        <div className="sub-col">
          <img src={userImage} alt="" />
        </div>
        <div className="sub-col">
          <h4>
            Welcome to KHEDMATE, your go-to destination for finding and applying
            to your dream job. Our platform was created with the goal of
            simplifying the job search process for both job seekers and
            employers. At KHEDMATE, we believe that everyone deserves the
            opportunity to find a fulfilling career that matches their skills
            and interests. That's why we provide a comprehensive database of job
            openings across a wide range of industries, from entry-level
            positions to executive roles. Our platform is designed to make it
            easy for job seekers to discover new opportunities and apply with
            just a few clicks. Our team is made up of passionate professionals
            who are dedicated to providing the best possible experience for our
            users. We are constantly working to improve our platform and offer
            new features that make it easier to connect with employers and find
            the perfect job. Whether you're just starting your career or looking
            for a new challenge, we're here to help you achieve your goals.
            Thank you for choosing KHEDMATE for your job search needs. We're
            excited to help you take the next step in your career!
          </h4>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;
