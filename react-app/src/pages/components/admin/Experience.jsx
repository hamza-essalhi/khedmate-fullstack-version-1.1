import { motion } from "framer-motion";
import domain from "../../../data/dmains.json";
import { useEffect, useState } from "react";
import Select from "../Select";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearMessagesWithDelay } from "../../../toolkit/messages/messageActions";
import { startRequest, completeRequest, errorRequests, clearRequestWithDelay, clearRequest } from '../../../toolkit/request/requestActions';
import api from "../../../toolkit/auth/config";
import Loading from "../Loading";
const Experience= ({ delay}) => {
  const { isLoading, errorRequest,lastRequest } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const newDelay = delay;
  const [selectedEducation, setEducation] = useState("");
  const [error, setError] = useState(false);
  const [educationData, setEducationData] = useState('')
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    company: '',
        domain:'',
        position: '',
        startDate: '',
        endDate: ''
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
 

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        const response = await api.get("employees");
        const employee = response.data.employee.jobExperience[0]
        
          setEducationData(employee)
        
        
        dispatch(clearRequestWithDelay())
      } catch (error) {
        
      }
    };

    fetchFilteredJobs();

  }, [lastRequest,dispatch]);
  useEffect(() => {

    if (educationData) {
      setFormData({
        company: educationData.company || "",
        domain: educationData.domain || "",
        position: educationData.position || "",
        startDate: educationData.startDate || "",
        endDate: educationData.endDate || "",

      });
    }
  }, [educationData]);
  const validateForm = () => {
    const errors = {};

    if (!formData.company) {
      errors.company = 'Title is required';
    }
    if (!formData.domain) {
      errors.domain = 'Domain is required';
    }
    if (!formData.startDate && !formData.endDate) {
      errors.date = 'Start Date and End Date is required';
    }
    
    if (!formData.position) {
      errors.position = 'Position Of  is required';
    }


    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const errors = {};

    if (!formData.company) {
      errors.company = 'Title is required';
    }
    if (!formData.domain) {
      errors.domain = 'Domain is required';
    }
    if (!formData.startDate && !formData.endDate) {
      errors.date = 'Start Date and End Date is required';
    }
    if (!formData.position) {
      errors.position = 'Position Of  is required';
    }


    setFormErrors(errors);
  }, [formData.company, formData.domain, formData.startDate, formData.endDate, formData.position])
  const handleSelectChangeEducation = (value) => {
    setEducation(value)

  };
  useEffect(() => {

    setFormData((prevFormData) => ({
      ...prevFormData,
      domain: selectedEducation
    }));

  }, [selectedEducation]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    dispatch(clearRequest())
    if (validateForm() && !educationData) {
      dispatch(startRequest());
      await api.post('employees/create', { jobExperience: [formData] }).then(() => dispatch(completeRequest())).catch((e) => dispatch(errorRequests()))
      dispatch(addMessage('Congratulations, your experience informations has been successfully added!'));
      dispatch(clearRequestWithDelay())
      dispatch(clearMessagesWithDelay());

    }
    else {
      setError(true)
    }

  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch(clearRequest())
    dispatch(startRequest());
    try {
      
      await api.put('employees/update', { jobExperience: [formData] });
      dispatch(completeRequest())
      dispatch(
        addMessage('Congratulations, your experience information has been successfully updated!')
      );
      dispatch(clearMessagesWithDelay());
      dispatch(clearRequestWithDelay())
    } catch (error) {
      dispatch(errorRequests())
    }
    
    
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = (d.getMonth() + 1).toString();
    if (month.length === 1) {
      month = `0${month}`; // Add leading zero if the month is a single digit
    }
    let day = d.getDate().toString();
    if (day.length === 1) {
      day = `0${day}`; // Add leading zero if the day is a single digit
    }
    return `${year}-${month}-${day}`;
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
        {educationData ? <form action="">
         
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
           <input type="text" name="company" placeholder="Fsac..." onChange={handleChange} defaultValue={educationData.company} />
           {formErrors.company && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                {formErrors.company}
              </motion.h5>} 
           <label htmlFor="">Period </label>
           <div className="input-group">
             <label htmlFor="">From</label>
             <input type="date" name="stratDate" id="" onChange={handleChange} defaultValue={formatDate(educationData.startDate)} />
             <label htmlFor="">To</label>
             <input type="date" name="endDate" id="" onChange={handleChange} defaultValue={formatDate(educationData.endDate)}/>
           </div>
           {formErrors.date && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                {formErrors.date}
              </motion.h5>} 
           <label htmlFor="">Position</label>
           <input type="text" name="position" placeholder="rh.." onChange={handleChange} defaultValue={educationData.position} />
           {formErrors.position && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                {formErrors.position}
              </motion.h5>} 
           <label htmlFor="">Domain</label>
           <input name="domain" type="text" disabled='disabled' defaultValue={educationData.domain} onChange={handleChange}/>
              <Select
                options={domain.filter(e => e.value !== "All")}
                op={educationData.domain}
                onChange={handleSelectChangeEducation}
                classValue='custom-select-2'
              />
         {formErrors.domain && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                {formErrors.domain}
              </motion.h5>}           <div className="btn">
             <button onClick={handleEdit}  type="button">
              Edit
             </button>
           </div>
           {isLoading && <Loading />}

              {error && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                Form data is not valid.
              </motion.h5>}
              {errorRequest && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                Oops! It looks like there was an issue adding your {isLoading && <Loading />}

                {error && <motion.h5
                  variants={{
                    start: {
                      x: -10,
                    },
                    end: {
                      x: 0,
                    },
                  }}
                  initial="start"
                  animate="end"
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                  }}
                  className="password-error"
                >
                  Form data is not valid.
                </motion.h5>}
                {errorRequest && <motion.h5
                  variants={{
                    start: {
                      x: -10,
                    },
                    end: {
                      x: 0,
                    },
                  }}
                  initial="start"
                  animate="end"
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                  }}
                  className="password-error"
                >
                  Oops! It looks like there was an issue adding your request. Please double-check your information and try again. If the problem persists, feel free to reach out to our support team for assistance. We're here to help!"
                </motion.h5>}. Please double-check your information and try again. If the problem persists, feel free to reach out to our support team for assistance. We're here to help!"
              </motion.h5>}
         </motion.div>
       </form> :
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
         <input type="text" name="company" placeholder="Fsac..." onChange={handleChange} />
         {formErrors.company && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                {formErrors.company}
              </motion.h5>}
         <label htmlFor="">Period </label>
         <div className="input-group">
           <label htmlFor=""  >From</label>
           <input type="date" name="startDate" id="" onChange={handleChange} />
           <label htmlFor="">To</label>
           <input type="date" name="endDate" id="" />
         </div>
         {formErrors.date && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                {formErrors.date}
              </motion.h5>}
              <label htmlFor="">Position</label>
         <input type="text" name="position" placeholder="Rh..." onChange={handleChange} />
         {formErrors.position && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                {formErrors.position}
              </motion.h5>}
         <label htmlFor="">Domain</label>
              <Select
                options={domain.filter(e => e.value !== "All")}
                op={'Selecte'}
                onChange={handleSelectChangeEducation}
                classValue='custom-select-2'
              />
         {formErrors.domain && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                {formErrors.domain}
              </motion.h5>}
         <div className="btn">
           <button onClick={handleSubmit}  type="button">
             Add
           </button>
         </div>
         {isLoading && <Loading />}

              {error && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                Form data is not valid.
              </motion.h5>}
              {errorRequest && <motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                Oops! It looks like there was an issue adding your {isLoading && <Loading />}

                {error && <motion.h5
                  variants={{
                    start: {
                      x: -10,
                    },
                    end: {
                      x: 0,
                    },
                  }}
                  initial="start"
                  animate="end"
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                  }}
                  className="password-error"
                >
                  Form data is not valid.
                </motion.h5>}
                {errorRequest && <motion.h5
                  variants={{
                    start: {
                      x: -10,
                    },
                    end: {
                      x: 0,
                    },
                  }}
                  initial="start"
                  animate="end"
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                  }}
                  className="password-error"
                >
                  Oops! It looks like there was an issue adding your request. Please double-check your information and try again. If the problem persists, feel free to reach out to our support team for assistance. We're here to help!"
                </motion.h5>}. Please double-check your information and try again. If the problem persists, feel free to reach out to our support team for assistance. We're here to help!"
              </motion.h5>}
       </motion.div>
     </form>}
      </div>
    </motion.div>
  );
};

 
export default Experience;