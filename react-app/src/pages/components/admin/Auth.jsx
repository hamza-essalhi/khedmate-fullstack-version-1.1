import { motion} from "framer-motion";

import { startRequest, completeRequest, errorRequests, clearRequestWithDelay, clearRequest } from '../../../toolkit/request/requestActions';
import { addMessage, clearMessagesWithDelay } from "../../../toolkit/messages/messageActions";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import authService from "../../../toolkit/auth/authService";
import { useDispatch, useSelector } from "react-redux";


const Auth = ({ delay,user}) => {
  const { isLoading, errorRequest } = useSelector((state) => state.request);
  
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showRpassword, setShowRpassword] = useState(false);
  const [isWeakPassword, setIsWeakPassword] = useState(false)
  const [isPasswordsMatch, setPasswordsMatch] = useState(false)
  const [isOldPasswordsMatch, setOldPasswordsMatch] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [error, setError] = useState(false)
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");
  const [emailMatch, setEmailMatch] = useState(true);
  const [email, setEmail] = useState(user.email);
  
  const newDelay = delay;
  const [setFormErrors] = useState({});
  const [formData, setFormData] = useState({
   
      email: "",
      password: "",
      newPassword:'',
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
    if (forbiddenDomain || email==='') {
      setEmailMatch(false)
    } else {
      setEmailMatch(true)
    }
    if(password.length<=0){
      setOldPasswordsMatch(false)
    }
    else {
      setOldPasswordsMatch(true)
    }

    const lowercaseRegex = /[a-z]/; // Regular expression for lowercase letters
    const uppercaseRegex = /[A-Z]/; // Regular expression for uppercase letters
    const digitRegex = /\d/; // Regular expression for digits

    if (password1.length < 8 ) {
      setIsWeakPassword(true);
      setPasswordErrorMessage('Your password is weak (less than 8 characters)');
    } else if (!lowercaseRegex.test(password1) ) {
      setIsWeakPassword(true);
      setPasswordErrorMessage('Your password is weak (missing lowercase letters)');
    } else if (!uppercaseRegex.test(password1) ) {
      setIsWeakPassword(true);
      setPasswordErrorMessage('Your password is weak (missing uppercase letters)');
    } else if (!digitRegex.test(password1) ) {
      setIsWeakPassword(true);
      setPasswordErrorMessage('Your password is weak (missing digits)');
    } else {
      setIsWeakPassword(false);
      setPasswordErrorMessage(''); // Password is strong, reset error message
    }

    setPassword1(formData.newPassword)
    setPassword2(formData.rpassword)
    setPassword(formData.password)
    setEmail(formData.email)
    

  }, [password,password1, password2, email,formData.password, formData.newPassword, formData.rpassword, formData.email]);
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
    setPassword1(formData.newPassword)
    setPassword2(formData.rpassword)
    setPassword(formData.password)
    setEmail(formData.email)
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.title = 'Email is required';
    }
    if (!formData.password) {
      errors.passowrd = 'Old Password is required';
    }
    
    if (!formData.rpassword) {
      errors.newPassowrd = 'New Password is required';
    }
    if (!formData.newPassword) {
      errors.rNewPassowrd = 'New Password is required';
    }
    
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
  setError(false)
  if (validateForm()){
      dispatch(clearRequest());
    dispatch(startRequest());
      try {
        // Use the authService to update the user
        await authService.updateUser(user._id, formData);
        dispatch(completeRequest());
        dispatch(addMessage('User updated successfully!'));
        dispatch(clearRequestWithDelay());
        dispatch(clearMessagesWithDelay());
        setTimeout(() => {
          window.location.reload();
        }, 2100); // 3000 milliseconds (3 seconds)
      } catch (error) {
        dispatch(errorRequests());
      }
    }
    else{
      setError(true)
      
    }

  };
  const handlePassword = (e) => {
    const input =document.querySelector('#password-input')
    setShowPassword(!showPassword);
   input.type=!showPassword ? 'text' : 'password';
  };
  const handlePassword1 = (e) => {
    const input =document.querySelector('#password1-input')
    setShowPassword1(!showPassword1);
   input.type=!showPassword1 ? 'text' : 'password';
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
            <input type="email" name="email" defaultValue={user.email} className={emailMatch ? 'input-error' : ''} placeholder="name@domain.com" onChange={handleChange} />
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
            <div className={isOldPasswordsMatch ? 'input-group' : 'error-input-password'} >
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
            {!isOldPasswordsMatch && <motion.h5
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
              Please Enter Your Old Password
            </motion.h5>}
            <label htmlFor="">New Password</label>
            <div className={isPasswordsMatch ? 'input-group' : 'error-input-password'} >
              <input type="password" name="newPassword" id="password1-input" placeholder="Password" onChange={handleChange} />
              {showPassword1 ? (
                <AiOutlineEyeInvisible
                  className="password-icon"
                  onClick={handlePassword1}
                ></AiOutlineEyeInvisible>
              ) : (
                <AiOutlineEye
                  className="password-icon"
                  onClick={handlePassword1}
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
            {isLoading && <Loading />}

        
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
  Oops! Incorrect old password"
</motion.h5>}
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
  Oops! please complete all fields"
</motion.h5>}
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};
 
export default Auth;