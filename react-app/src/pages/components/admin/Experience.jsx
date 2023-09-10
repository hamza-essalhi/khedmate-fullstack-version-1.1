import { motion } from "framer-motion";
import domain from "../../../data/dmains.json";
import { useEffect, useState } from "react";
import Select from "../Select";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearMessagesWithDelay } from "../../../toolkit/messages/messageActions";
import { startRequest, completeRequest, errorRequests, clearRequestWithDelay, clearRequest } from '../../../toolkit/request/requestActions';
import api from "../../../toolkit/auth/config";
import Loading from "../Loading";
const Experience = ({ delay }) => {
  const { isLoading, errorRequest, lastRequest } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const newDelay = delay;
  const [selectedEducation, setEducation] = useState("");
  const [error, setError] = useState(false);
  const [resData, setResData] = useState('')
  const [formErrors, setFormErrors] = useState({});
  const [isEmpty, setEmpty] = useState(true)
  const [formData, setFormData] = useState({
    company: '',
    domain: '',
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
        setResData(employee)
        dispatch(clearRequestWithDelay())
        if (Object.keys(response.data.employee).length === 0) {
          setEmpty(true)
        }
        else {
          setEmpty(false)
        }
      } catch (error) {

      }
    };

    fetchFilteredJobs();

  }, [lastRequest, dispatch]);
  useEffect(() => {

    if (resData) {
      setFormData({
        company: resData.company || "",
        position: resData.position || "",
        startDate: resData.startDate || "",
        endDate: resData.endDate || "",
        domain: resData.domain || "",

      });
    }
  }, [resData]);
  const validateForm = () => {
    const errors = {};

    if (!formData.company) {
      errors.company = 'Title is required';
    }
    if (!formData.domain) {
      errors.domain = 'Domain is required';
    }
    if (!formData.startDate) {
      errors.startDate = 'Start Date is required';
    }
    if (!formData.endDate) {
      errors.endDate = 'End Date is required';
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
    if (!formData.startDate) {
      errors.startDate = 'Start Date is required';
    }
    if (!formData.endDate) {
      errors.endDate = 'End Date is required';
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
    if (validateForm()) {
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month because months are zero-indexed
  const day = date.getDate().toString().padStart(2, '0');
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
        {!isEmpty ? <form action="">

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
            
            <input type="text" name="company" placeholder="Fsac..." onChange={handleChange} defaultValue={resData?.company} />
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
            <label htmlFor="">Start Date ({formatDate(resData?.startDate)})</label>

            <input type="date" name="startDate" placeholder="2023..."   onChange={handleChange} defaultValue={formatDate(resData?.startDate)} />
              {formErrors.startDate && <motion.h5
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
                {formErrors.startDate}
              </motion.h5>}
              <label htmlFor="">End Date ({formatDate(resData?.endDate)})</label>
              <input type="date" name="endDate" placeholder="2023..." defaultValue={formatDate(resData?.endDate)} onChange={handleChange} />
              {formErrors.endDate && <motion.h5
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
                {formErrors.endDate}
              </motion.h5>}
            <label htmlFor="">Position</label>
            <input type="text" name="position" placeholder="rh.." onChange={handleChange} defaultValue={resData?.position} />
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
            <input name="domain" type="text" disabled='disabled' defaultValue={resData?.domain} onChange={handleChange} />
            <Select
              options={domain.filter(e => e.value !== "All")}
              op={resData?.domain}
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
              <button onClick={handleEdit} type="button">
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
              <label htmlFor="">Start Date ({formatDate(resData.startDate)})</label>

              <input type="date" name="startDate" placeholder="2023..." defaultValue={formatDate(resData.startDate)} onChange={handleChange} />
              {formErrors.startDate && <motion.h5
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
                {formErrors.startDate}
              </motion.h5>}
              <label htmlFor="">End Date ({formatDate(resData.endDate)})</label>
              <input type="date" name="endDate" placeholder="2023..." defaultValue={formatDate(resData?.endDate)} onChange={handleChange} />
              {formErrors.endDate && <motion.h5
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
                {formErrors.endDate}
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
                <button onClick={handleSubmit} type="button">
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
                Oops! It looks like there was an issue adding your 

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