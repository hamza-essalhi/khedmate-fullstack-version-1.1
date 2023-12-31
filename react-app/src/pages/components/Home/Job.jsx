import { useEffect, useRef, useState } from "react";
import userImage from "../../../images/user.jpg";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";

import api from "../../../toolkit/auth/config";
import moment from "moment";


const Job = ({job}) => {
  const [user,setUser]=useState('')
  const [like] = useState(false);
  const ref = useRef(null);
  const target = useInView(ref, { once: true });
  const animate = useAnimation();
  const [formatteDate,setFormattedDate]=useState('')
  const transition = {
    duration: 0.5,
    delay: 0.1,
  };

  useEffect(()=>{
    const getUser = async ()=>{
      
      const response = await api.get(`users/${job.userId}`)
      setUser(response.data.user)
    }
    getUser()
  },[job.userId])
  useEffect(() => {
    
    setFormattedDate(moment(job.createdAt).fromNow());
  }, [job.createdAt]);

  useEffect(() => {
    if (target) {
      animate.start("end");
    }
  }, [target,animate]);

  const handleLike = () => {
  
  };

  return (
    <motion.div
      className="row job-box"
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
      <div className="sub-row">
        <motion.div
          className="col user-data"
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
          <img src={user.img? user.img:userImage} alt="" />
          <div className="sub-col">
            <span>
              {job.ownerFirstName} {job.ownerLastName}
            </span>
            <span>{job?.city}</span>
            <span>{formatteDate}</span>
          </div>
        </motion.div>
        
        <motion.div
          className="col like"
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
            delay: 0.7,
          }}
        >
          {!like ? (
            <AiOutlineHeart
              className="like-btn"
              onClick={handleLike}
            ></AiOutlineHeart>
          ) : (
            <AiFillHeart
              className="like-btn"
              onClick={handleLike}
            ></AiFillHeart>
          )}
        </motion.div>
      </div>
      <motion.div
          className="col job-title"
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
          
          <h1>{job.title}</h1>
          <h4>{job.company}</h4>

        </motion.div>
      <motion.div
        className="sub-row job-details"
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
          delay: 0.9,
        }}
      >
        <span>{job?.jobDescription}</span>

        <Link to={"job/" + job?._id}>Apply Now</Link>
      </motion.div>

      <motion.div
        className="sub-col key-words"
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
        <h3>Keywords</h3>
        <div className="keywords-row">
          {job?.keywords.map((keyword, index) => (
            <span key={index}>{keyword}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Job;
