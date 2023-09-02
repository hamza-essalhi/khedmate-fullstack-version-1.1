import { motion} from "framer-motion";


import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const Auth = ({ delay,user}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRpassword, setShowRpassword] = useState(false);
  const [isWeakPassword, setIsWeakPassword] = useState(false)
  const [isPasswordsMatch, setPasswordsMatch] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailMatch, setEmailMatch] = useState(true);
  const [email, setEmail] = useState("");
  const newDelay = delay;

  const [formData, setFormData] = useState({
   
      email: "",
      password: "",
      rpassword:''
  });
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
    

  }, [password1, password2, email, formData.password, formData.rpassword, formData.email]);
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
    setPassword1(formData.password)
    setPassword2(formData.password2)
    setEmail(formData.email)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
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


  return (
    <motion.div
      className="row user-row-props auth"
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
        >Credentials</motion.h1>
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
                
            animate="end"
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="password-error"
              >
                Pleas Enter A Valide Email
              </motion.h5>}            
            <label htmlFor="">Old Password</label>
            <input type="password" name="old_password" placeholder="Old Password" onChange={handleChange} />
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
              animate="end"
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
              animate="end"
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="password-error"
            >
              {passwordErrorMessage}
            </motion.h5>}
            <div className="btn">
              <button onClick={handleSubmit}  type="button">
                Edite
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};
 
export default Auth;