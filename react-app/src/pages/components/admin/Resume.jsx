import { motion } from "framer-motion";

import { useState } from "react";
const Resume = ({ delay }) => {
  const newDelay = delay;

  const [formData, setFormData] = useState({
    school_name: "",
    field_of_study: "",
    graduation_year: "",
  });

  const animationProps = {
    start: {
      opacity: 0,
      x: -30,
      scale: 0.9,
      width: 0,
    },
    end: {
      opacity: 1,
      x: 0,
      scale: 1,
      width: "auto",
    },
  };

  const formProps = {
    start: {
      opacity: 0,
      y: -30,
      scale: 0.9,
    },
    end: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <motion.div
      className="row user-row-props"
      variants={animationProps}
      initial="start"
      animate="end"
      transition={{
        duration: 0.5,
        delay: newDelay + 0.1,
      }}
    >
      <div className="col">
        <motion.h1
          className="form-content"
          variants={formProps}
          initial="start"
          animate="end"
          transition={{
            duration: 0.5,
            delay: newDelay + 0.8,
          }}
        >
          My Resume
        </motion.h1>
        <form action="">
          <motion.div
            className="form-content"
            variants={formProps}
            initial="start"
            animate="end"
            transition={{
              duration: 0.5,
              delay: newDelay + 0.9,
            }}
          >
            <label htmlFor="">Boi</label>
            <textarea
              name="boi"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
              placeholder="I'm a web devloper ..."
            ></textarea>
            <label htmlFor="">Resume</label>
            <input
              type="file"
              name="graduation_year"
              placeholder="2023..."
              onChange={handleChange}
            />
            
            <motion.div
              className="key-words"
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
              animate="end"
              transition={{
                duration: 0.5,
                delay: 1,
              }}
            >
              <h3>Skills</h3>
              <div className="col-key-words">
                <span>Chemistry</span>
                <span>Chemistry</span>
                <span>Web Developing</span>
                <span>Python</span>
              </div>
            </motion.div>
            <div className="btn">
              <button onClick={handleSubmit} type="button">
                Add
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default Resume;
