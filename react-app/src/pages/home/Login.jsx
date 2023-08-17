import { useEffect, useRef, useState } from "react";

import { motion, useAnimation, useInView } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import loadingImg from '../../images/Spin-0.5s-200px.gif'
import doneImg from '../../images/system-solid-31-check.gif'

const Login = () => {
  document.title = "Login";
  const user=true
  const ref = useRef(null);
  const navigate=useNavigate()
  const {error,loading,successed}=true
  const [setEmail] = useState("");
  const [setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
  const handlePassword = (e) => {
    const input =document.querySelector('#password-input')
    setShowPassword(!showPassword);
   input.type=!showPassword ? 'text' : 'password';
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = {
    //   email: email,
    //   password: password,
    // };
    
    
    if(user){
      navigate('/')
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
            Login
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
            onSubmit={handleSubmit}
          >
            <label htmlFor="">Email</label>
            <input type="email" name="email" placeholder="name@domain.com" onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="">Password</label>
            <div className="input-group">
              <input type="password" name="password" id="password-input" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
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
            <div className={error? 'active':'errorState'}>
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
            Invalid email or password
          </motion.h3>
            </div>
            <div className="btn">
              <button>Login</button>
            </div>
            {loading &&(
              <div className="loading">
              <img src={loadingImg} alt="" />
            </div>
            )}
            {successed &&(
              <div className="loading">
              <img src={doneImg} alt="" />
            </div>
            )}
            
            
            <a href="/">Rest you Password</a>
            <a href="sign-up">
              You don't have account? <span>Sign Up</span>
            </a>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
