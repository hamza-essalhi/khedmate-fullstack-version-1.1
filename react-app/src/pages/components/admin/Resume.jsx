import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearMessagesWithDelay } from "../../../toolkit/messages/messageActions";
import { startRequest, completeRequest, errorRequests, clearRequestWithDelay, clearRequest } from '../../../toolkit/request/requestActions';
import api from "../../../toolkit/auth/config";
import Loading from "../Loading";
const Resume = ({ delay }) => {
  const newDelay = delay;
  const { isLoading, errorRequest, lastRequest } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [resData, setResData] = useState('')
  const [formErrors, setFormErrors] = useState({});
  const [isEmpty, setEmpty] = useState(true)
  const [formData, setFormData] = useState({
    resume: "",
    motivationLetter: "",
    email:'',
    phone:''
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
        const employee = response.data.employee
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
   
  };

  useEffect(() => {

    if (resData) {
      setFormData({
        resume: resData.resume || "",
        motivationLetter: resData.motivationLetter || "",
        email:resData.email ||'',
        phone:resData.phone ||''
      });
    }
  }, [resData]);

  const validateForm = () => {
    const errors = {};
    const forbiddenDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "aol.com",
      "outlook.com",
      "icloud.com",
      "mail.com",
      "protonmail.com",
      "yandex.com",
      "zoho.com",
      "inbox.com",
      "gmx.com",
      "fastmail.com",
      "tutanota.com",
      "mail.ru",
      "live.com",
      "msn.com",
      "me.com",
      "qq.com",
      "163.com",
      "126.com",
      "yeah.net",
      "sina.com",
      "sohu.com",
      "aliyun.com",
      "foxmail.com",
      "tom.com",
      "vip.163.com",
      "vip.126.com",
      "vip.qq.com",
      "vip.sina.com",
      "vip.sohu.com",
      "vip.foxmail.com",
      "vip.tom.com",
    ];

    const forbiddenDomain = forbiddenDomains.find((domain) => formData.email.endsWith("@" + domain))
    if (!formData.resume) {
      errors.resume = 'Resume is required';
    }
    if (!formData.motivationLetter) {
      errors.motivationLetter = 'Motivation letter is required';
    }
    if(!formData.email || !forbiddenDomain){
      errors.email='Pleas email is required and must be valide email'
    }
    if(!formData.phone ||isNaN(formData.phone)){
      errors.phone = 'Pleas Phone is required and must be valide phone'
    }
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const errors = {};
    const forbiddenDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "aol.com",
      "outlook.com",
      "icloud.com",
      "mail.com",
      "protonmail.com",
      "yandex.com",
      "zoho.com",
      "inbox.com",
      "gmx.com",
      "fastmail.com",
      "tutanota.com",
      "mail.ru",
      "live.com",
      "msn.com",
      "me.com",
      "qq.com",
      "163.com",
      "126.com",
      "yeah.net",
      "sina.com",
      "sohu.com",
      "aliyun.com",
      "foxmail.com",
      "tom.com",
      "vip.163.com",
      "vip.126.com",
      "vip.qq.com",
      "vip.sina.com",
      "vip.sohu.com",
      "vip.foxmail.com",
      "vip.tom.com",
    ];

    const forbiddenDomain = forbiddenDomains.find((domain) => formData.email.endsWith("@" + domain))
    if (!formData.resume) {
      errors.resume = 'Resume is required';
    }
    if (!formData.motivationLetter) {
      errors.motivationLetter = 'motivation letter is required';
    }
    if(!formData.email || !forbiddenDomain){
      errors.email='Pleas email is required and must be valide email'
    }
    if(!formData.phone ||isNaN(formData.phone)){
      errors.phone = 'Pleas Phone is required and must be valide phone'
    }
   

    setFormErrors(errors);
  }, [formData.resume, formData.motivationLetter,formData.phone ,formData.email])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    dispatch(clearRequest())
    if (validateForm() && !resData) {
      dispatch(startRequest());
      await api.post('employees/create', formData).then(() => dispatch(completeRequest())).catch((e) => dispatch(errorRequests()))
      dispatch(addMessage('Congratulations, your Resume  has been successfully added!'));
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
    
    try {
      if (validateForm() )
      {
        dispatch(startRequest());
        await api.put('employees/update', formData);
      dispatch(completeRequest())
      dispatch(
        addMessage('Congratulations, your Resume  has been successfully updated!')
      );
      dispatch(clearMessagesWithDelay());
      dispatch(clearRequestWithDelay())
      }
      else{
        setError(true)
      }
    } catch (error) {
      dispatch(errorRequests())
    }


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
        {isEmpty ? <form action="">
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
            <label htmlFor="">Email</label>
            <input type="email" name="email" defaultValue={resData?.email} className={formErrors.email ? 'input-error' : ''} placeholder="name@domain.com" onChange={handleChange} />
            {formErrors.email&&<motion.h5
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
                {formErrors.email}
              </motion.h5>}  

              <label htmlFor="">Phone</label>

            <input
              type="tel"
              name="phone"
              className={formErrors.phone? "input-error" : ""}
              defaultValue={resData?.phone}
              onChange={handleChange}
              placeholder="066666.."
            />
            {formErrors.phone&&<motion.h5
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
                {formErrors.phone}
              </motion.h5>} 
            <label htmlFor="">Motivation Letter </label>
            <textarea
              name="motivationLetter"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
              placeholder="I'm a web devloper ..."
            ></textarea>
            {formErrors.motivationLetter && <motion.h5
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
              {formErrors.motivationLetter}
            </motion.h5>}
            <label htmlFor="">Resume</label>
            <input
              type="url"
              name="resume"
              placeholder="https://example.com/myresume.pdf" pattern="https://.*" size="30" required
              onChange={handleChange}
            />
            {formErrors.resume && <motion.h5
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
              {formErrors.resume}
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
              Oops! It looks like there was an issue adding your request

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
               <label htmlFor="">Email</label>
            <input type="email" name="email" defaultValue={resData?.email} className={formErrors.email ? 'input-error' : ''} placeholder="name@domain.com" onChange={handleChange} />
            {formErrors.email&&<motion.h5
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
                {formErrors.email}
              </motion.h5>}  

              <label htmlFor="">Phone</label>

            <input
              type="tel"
              name="phone"
              className={formErrors.phone? "input-error" : ""}
              defaultValue={resData?.phone}
              onChange={handleChange}
              placeholder="066666.."
            />
            {formErrors.phone&&<motion.h5
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
                {formErrors.phone}
              </motion.h5>} 
              <label htmlFor="">Motivation Letter </label>
              <textarea
                name="motivationLetter"
                id=""
                cols="30"
                rows="10"
                onChange={handleChange}
                placeholder="I'm a web devloper ..."
                defaultValue={resData?.motivationLetter}
              ></textarea>
              {formErrors.motivationLetter && <motion.h5
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
                {formErrors.motivationLetter}
              </motion.h5>}
              <label htmlFor="">Resume</label>
              <input
                type="url"
                name="resume"
                placeholder="https://example.com/myresume.pdf" pattern="https://.*" size="30" required
                defaultValue={resData?.resume}
                onChange={handleChange}
              />
              {formErrors.resume && <motion.h5
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
                {formErrors.resume}
              </motion.h5>}

              <div className="btn">
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
                Oops! It looks like there was an issue adding your request

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

export default Resume;
