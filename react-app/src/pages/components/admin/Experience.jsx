import { motion } from "framer-motion";

import { useState } from "react";
const Experience= ({ delay}) => {
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
    console.log(formData)
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
        }}>
         Experience
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
            <label htmlFor="">Company Name</label>
            <input type="text" name="school_name" placeholder="Fsac..." onChange={handleChange} />
            <label htmlFor="">Period </label>
            <div className="input-group">
              <label htmlFor="">From</label>
              <input type="date" name="" id="" />
              <label htmlFor="">To</label>
              <input type="date" name="" id="" />
            </div>
            <input type="text" name="graduation_year" placeholder="2023..." onChange={handleChange} />
            <label htmlFor="">Specialty</label>
            <input type="text" name="field_of_study" placeholder="Maths..." onChange={handleChange} />
            <div className="btn">
              <button onClick={handleSubmit}  type="button">
                Add 
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

 
export default Experience;