import { useEffect, useRef, useState } from "react";

import { motion, useAnimation, useInView } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Select from "../components/Select";

const SignUp = () => {
  document.title = "Sign Up";
  const ref = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRpassword, setShowRpassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [phoneMatch, setPhoneMatch] = useState(true);
  const [emailMatch, setEmailMatch] = useState(true);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    first_name:'',
    last_name:'',
    worker:'',
    phone:'',
    email: "",
    password: "",
    rpassword:''
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
  }, [target, animate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setPassword1(formData.password)
    setPassword2(formData.password2)
    setEmail(formData.email)
    setPhone(formData.phone)
  };
  const handlePassword = (e) => {
    const input =document.querySelector('#password-input')
    setShowPassword(!showPassword);
   input.type=!showPassword ? 'text' : 'password';
  };
  const handleRpassword = () => {
    const input =document.querySelector('#rpassword-input')
    setShowRpassword(!showRpassword);
   input.type=!showRpassword ? 'text' : 'password';
  };
  const handleSelectChangeWorker = (value) => {
    if (value === 'true'){
      value=true
    }
    else{
      value=false
    }
    setFormData({
      ...formData,
      worker: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
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
    if (isNaN(phone)){
      setPhoneMatch(true)
    }
    else{
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
    setPassword1(formData.password)
    setPassword2(formData.rpassword)
    setEmail(formData.email)
    setPhone(formData.phone)

  }, [password1, password2,phone,email,formData.password,formData.rpassword,formData.email,formData.phone]);
  
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
            <input type="text" name="first_name" placeholder="first name..." onChange={handleChange} />
            <label htmlFor="">Last Name</label>
            <input type="text" name="last_name" placeholder="last name..." onChange={handleChange}  />
            <label htmlFor="">Email</label>
            <input type="email" name="email" className={emailMatch ? 'input-error' : ''}  placeholder="name@domain.com" onChange={handleChange}/>
            <label htmlFor="">Phone</label>
            <input type="tel" name="phone" className={phoneMatch ? 'input-error' : ''}  placeholder="0666666666" onChange={handleChange} />
            <label htmlFor="">Password</label>
            <div className={!passwordsMatch ? 'error' : 'input-group'} >
              <input type="password" name="password" id="password-input"  placeholder="Password" onChange={handleChange}/>
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
            <div className={!passwordsMatch ? 'error' : 'input-group'}>
              <input type="password" name="rpassword" id="rpassword-input"  placeholder="Repeat Password"/>
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
            <label htmlFor="">Worker ?</label>
            <Select
            
                options={
                  [
                    {"label": "True" , "value": "true"},
                    {"label": "False" , "value": "false"}
                  ]
                }
                defaultValue="Select"
                onChange={handleSelectChangeWorker}
              />

            <div className="btn">
              <button onClick={handleSubmit}>Sign Up</button>
            </div>
            
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
