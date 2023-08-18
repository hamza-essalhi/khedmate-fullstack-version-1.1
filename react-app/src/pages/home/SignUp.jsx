import { useEffect, useRef, useState } from "react";
import loadingImg from '../../images/Spin-0.5s-200px.gif'
import { motion, useAnimation, useInView } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Select from "../components/Select";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync, restSlice } from "../../toolkit/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  document.title = "Sign Up";
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const isCreated = useSelector((state) => state.auth.isCreated);
  const ref = useRef(null);
  const navigate = useNavigate()
  const [isWeakPassword, setIsWeakPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showRpassword, setShowRpassword] = useState(false);
  const [isPasswordsMatch, setPasswordsMatch] = useState(false);
  const [phoneMatch, setPhoneMatch] = useState(true);
  const [emailMatch, setEmailMatch] = useState(true);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('This user already exists. Please try using a different email or log in.')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    research: '',
    phone: '',
    email: "",
    password: "",
    rpassword: ''
  });
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
    if (isCreated) {
      dispatch(restSlice())
      navigate(`/login`);
    }
  }, [target, animate, isCreated, navigate, dispatch]);


 const  capitalizeFirstLetter=(str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstName' || name === 'lastName') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: capitalizeFirstLetter(value),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    setPassword1(formData.password)
    setPassword2(formData.rpassword)
    setEmail(formData.email)
    setPhone(formData.phone)
  };
  const handlePassword = (e) => {
    const input = document.querySelector('#password-input')
    setShowPassword(!showPassword);
    input.type = !showPassword ? 'text' : 'password';
  };
  const handleRpassword = () => {
    const input = document.querySelector('#rpassword-input')
    setShowRpassword(!showRpassword);
    input.type = !showRpassword ? 'text' : 'password';
  };
  const handleSelectResearch = (value) => {
    if (value === 'Human Researcher') {
      value = true
    }
    else {
      value = false
    }
    formData.research = value
  };

  

  useEffect(() => {
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

    const forbiddenDomain = forbiddenDomains.find((domain) => email.endsWith("@" + domain))
    if (isNaN(phone) && phone !== '') {
      setPhoneMatch(true)
    }
    else {
      setPhoneMatch(false)
    }
    if (password1 !== password2) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
    if (forbiddenDomain) {
      setEmailMatch(false)
    } else {
      setEmailMatch(true)
    }

    const lowercaseRegex = /[a-z]/; // Regular expression for lowercase letters
    const uppercaseRegex = /[A-Z]/; // Regular expression for uppercase letters
    const digitRegex = /\d/; // Regular expression for digits

    if (password1.length < 8 && password1 !== '') {
      setIsWeakPassword(true);
      setPasswordErrorMessage('Your password is weak (less than 8 characters)');
    } else if (!lowercaseRegex.test(password1) && password1 !== '') {
      setIsWeakPassword(true);
      setPasswordErrorMessage('Your password is weak (missing lowercase letters)');
    } else if (!uppercaseRegex.test(password1) && password1 !== '') {
      setIsWeakPassword(true);
      setPasswordErrorMessage('Your password is weak (missing uppercase letters)');
    } else if (!digitRegex.test(password1) && password1 !== '') {
      setIsWeakPassword(true);
      setPasswordErrorMessage('Your password is weak (missing digits)');
    } else {
      setIsWeakPassword(false);
      setPasswordErrorMessage(''); // Password is strong, reset error message
    }

    setPassword1(formData.password)
    setPassword2(formData.rpassword)
    setEmail(formData.email)
    setPhone(formData.phone)

  }, [password1, password2, phone, email, formData.password, formData.rpassword, formData.email, formData.phone]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.firstName && formData.lastName && formData.research && formData.email && formData.phone && isPasswordsMatch && !emailMatch && !phoneMatch && !isWeakPassword) {
      try {
        dispatch(registerAsync(formData));
        setErrorMessage('This user already exists. Please try using a different email or log in.')
      } catch (e) {
      }
    } else {
      setFormError(true)
      setErrorMessage("Please complete all fields.");
    }
  };

  return (
    <motion.div
      className="auth"
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
        className=" col left"
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
        ></motion.div>
      </motion.div>
      <motion.div
        className=" col right"
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
            Sign Up
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
            <label htmlFor="">First Name</label>
            <input type="text" name="firstName" placeholder="first name..." onChange={handleChange} />
            <label htmlFor="">Last Name</label>
            <input type="text" name="lastName" placeholder="last name..." onChange={handleChange} />
            <label htmlFor="">Email</label>
            <input type="email" name="email" className={emailMatch ? 'input-error' : ''} placeholder="name@domain.com" onChange={handleChange} />
            {emailMatch&&<motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate={animate}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                Pleas Enter A Valide Email
              </motion.h5>}
            <label htmlFor="">Phone</label>
            <input type="tel" name="phone" className={phoneMatch ? 'input-error' : ''} placeholder="0666666666" onChange={handleChange} />
            {phoneMatch&&<motion.h5
                variants={{
                  start: {
                    x: -10,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate={animate}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                Pleas Enter A Valide Phone Number
              </motion.h5>}
            <label htmlFor="">Password</label>
            <div className={isPasswordsMatch ? 'input-group' : 'error-input-password'} >
              <input type="password" name="password" id="password-input" placeholder="Password" onChange={handleChange} />
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="password-icon"
                  onClick={handlePassword}
                ></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye
                  className="password-icon"
                  onClick={handlePassword}
                ></AiOutlineEye>
              )}
            </div>
            <label htmlFor="">Reapeat Password</label>
            <div className={isPasswordsMatch ? 'input-group' : 'error-input-password'}>
              <input type="password" name="rpassword" id="rpassword-input" placeholder="Repeat Password" onChange={handleChange} />
              {showRpassword ? (
                <AiOutlineEyeInvisible
                  className="password-icon"
                  onClick={handleRpassword}
                ></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye
                  className="password-icon"
                  onClick={handleRpassword}
                ></AiOutlineEye>
              )}
            </div>
            {!isPasswordsMatch && <motion.h5
              variants={{
                start: {
                  x: -10,
                },
                end: {
                  x: 0,
                },
              }}
              initial="start"
              animate={animate}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="password-error"
            >
              Passwords not match !
            </motion.h5>}
            {isWeakPassword && <motion.h5
              variants={{
                start: {
                  x: -10,
                },
                end: {
                  x: 0,
                },
              }}
              initial="start"
              animate={animate}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="password-error"
            >
              {passwordErrorMessage}
            </motion.h5>}

            <label htmlFor="" className="choice-lable">Are you <span>searching for a job</span>, or are you a <span>human researcher</span>?</label>

            <Select

              options={
                [
                  { "label": "Human Researcher", "value": "Human Researcher" },
                  { "label": "Searching For Job", "value": "Searching For Job" }
                ]
              }
              defaultValue="Select"
              onChange={handleSelectResearch}
            />

            <div className={(error || formError) ? 'active' : 'errorState'}>
              <motion.h3
                variants={{
                  start: {
                    x: -100,
                  },
                  end: {
                    x: 0,
                  },
                }}
                initial="start"
                animate={animate}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
              >
                {errorMessage}
              </motion.h3>
            </div>

            <div className="btn">
              <button onClick={handleSubmit}>Sign Up</button>
            </div>


            {loading && (
              <div className="loading">
                <img src={loadingImg} alt="" />
              </div>
            )}

            <a href="login">
              You have account? <span>Login</span>
            </a>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
