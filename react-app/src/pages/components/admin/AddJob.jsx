import { motion } from "framer-motion";

import { useState } from "react";
const AddJob = ({ delay}) => {
  const newDelay = delay;


  const [formData, setFormData] = useState({
    company_name: "",
    specialty: "",
    experience_period: "Months",
    field_of_study: "",
    education: "",
    salary: "",
    contact_number: "",
    contact_email: "",
    job_description: "",
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
          Add New Job
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
            <input type="text" name="company_name" placeholder="Fsac..." onChange={handleChange} />
            <label htmlFor="">Specialty</label>
            <input type="text" name="specialty" placeholder="specialty..." onChange={handleChange} />
            <label htmlFor="">Months / Years Of Experience  </label>
            <div className="input-group">
            <input type="text" name="field_of_study" placeholder="12 Months / 2 Years..." onChange={handleChange} />
            <select name="experience_period" id="" onChange={handleChange}>
              <option value="Months">Month</option>
              <option value="Years">Years</option>
            </select>
            </div>
            <label htmlFor="">Education</label>
            <input type="text" name="education" placeholder="education..." onChange={handleChange} />
            <label htmlFor="">Salary </label>
            <input type="text" name="salary" placeholder="2450Dh" onChange={handleChange} />
            <label htmlFor="">Contact Number</label>
            <input type="text" name="contact_number" placeholder="0666666666" onChange={handleChange} />
            <label htmlFor="">Contact Email</label>
            <input type="email" name="contact_email" placeholder="name@domain.com" onChange={handleChange} />
            <label htmlFor="">Job Description </label>
            <textarea name="job_description" id="" cols="30" rows="10" placeholder="Description..."></textarea>
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

export default AddJob;