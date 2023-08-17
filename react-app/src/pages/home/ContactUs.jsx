import { useEffect, useRef } from "react";

import { motion, useAnimation, useInView } from "framer-motion";

const ContactUs = () => {
  document.title = 'Contact Us';
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
      className="contact-us"
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
        <motion.div
          className="sub-col"
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
            delay: 0.6,
          }}
        >
          <motion.h3
            variants={{
              start: {
                opacity: 0,
               
                x: -100,
              },
              end: {
                opacity: 1,
               
                x: 0,
              },
            }}
            initial="start"
            animate={animate}
            transition={{
              duration: 0.5,
              delay: 0.8,
            }}
          >
            Contat Us
          </motion.h3>
          <motion.form
            action=""
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
              delay: 1,
            }}
          >
            <label htmlFor="">Full Name</label>
            <input type="text" />
            <label htmlFor="">Email</label>
            <input type="emai" />
            <label htmlFor="">Your Message</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <div className="btn">
            <button>Send</button>
            </div>

          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;
