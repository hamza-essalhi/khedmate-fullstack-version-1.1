import { useEffect, useRef, useState } from "react";
import jobImage from "../../images/user.jpg";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, useAnimation, useInView } from "framer-motion";
import {useDispatch, useSelector } from "react-redux";
import api from "../../toolkit/auth/config";
import { startRequest, completeRequest, errorRequests, clearRequestWithDelay, clearRequest }from "../../toolkit/request/requestActions";
import Loading from "../components/Loading";
import { addMessage, clearMessagesWithDelay } from "../../toolkit/messages/messageActions";
import Message from "../components/Message";
const JobPost = () => {
  const { id } = useParams();
  const { isLoading, errorRequest, lastRequest } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const logedUser=useSelector((state) => state.auth.user?.user);
  const [user,setUser]=useState('')
  const [job, setJob] = useState([]);
  const [like, setLike] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const ref = useRef(null);
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

  useEffect(() => {
    // Fetch job data asynchronously
    axios
      .get(`http://localhost:9000/api/jobs/${id}`)
      .then((response) => {
        const jobPosts = response.data.job;
        // Check if jobPosts contains valid data
        if (jobPosts && jobPosts.userId) {
          setJob(jobPosts);
        } else {
          console.error('Job data is missing userId:', jobPosts);
        }
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
      });
  }, [id,lastRequest]);
  
  // ...
  
  useEffect(() => {
    // Check if job and job.userId are defined before making the API request
    if (job?.userId) {
      const getUser = async () => {
        try {
          const response = await api.get(`users/${job.userId}`);
          const userData = response.data.user;
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      getUser();
    } 
  }, [job]);
  
  
  
  
  
  useEffect(() => {
    try {
      const likedJobs = JSON.parse(localStorage.getItem("likedJobs")) || [];
      const liked = likedJobs.filter((job) => job.id === parseInt(id));
      setLike(liked[0].liked);
    } catch {
      setLike(false);
    }
  }, [id]);
  const handleLike = () => {
  };
  

  const hanleSubmit =async()=>{
    dispatch(clearRequest())
    try{
      dispatch(startRequest());
      await api.post(`jobApplication/create/${job._id}`).then(() => {
        dispatch(completeRequest())
        dispatch(addMessage('Congratulations, your job application has been successfully sent'));
      }).catch((e) => dispatch(errorRequests()))
      
      dispatch(clearRequestWithDelay())
      dispatch(clearMessagesWithDelay());
    }
    catch{
      dispatch(errorRequests())
    }
  }
  useEffect(() => {
    const timestampStr = job.createdAt;

    const timestamp = new Date(timestampStr);
    const formattedDate = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')} ${String(timestamp.getHours()).padStart(2, '0')}:${String(timestamp.getMinutes()).padStart(2, '0')}:${String(timestamp.getSeconds()).padStart(2, '0')}`;
    setFormattedDate(formattedDate);
  }, [job.createdAt]);
  document.title = job.title;
  return (
    <motion.div
      className="job-post"
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
          x: 10,
        },
      }}
      initial="start"
      animate={animate}
      transition={transition}
    >
      <Message messages={messages} />
      <div className="sub-row">
        <motion.div
          className="col job-data"
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
          <img src={user?.img? user.img:jobImage} alt="" />
        </motion.div>
        <motion.div
          className="col date"
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
          <h3>{job.title}</h3>
          <div className="sub-row">
            <span>
              Post By: {job.ownerFirstName} {job.ownerLastName}
            </span>
            <span>City: {job.city}</span>
            <span>Published on: {formattedDate}</span>
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
            delay: 0.8,
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
        className=" job-details"
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
        <span>{job.job_description}</span>
        <div className="sub-row">
          <span>Domain: {job.domain}</span>
          <span>Experience: {job.experience}</span>
          
        </div>
        <div className="sub-row">
        <span>Job type: {job.type}</span>
          <span>Company: {job.company}</span>
          <span>Education level: {job.educationLevel}</span>
        </div>
        <div className="sub-row">
          <span>salary: {job.salary} DH</span>
          
        </div>
        {(isAuthenticated && !logedUser.research) &&<button onClick={hanleSubmit}>Apply Now</button>
        }
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
Oops! It looks like you've already sent an application for this job.
</motion.h5>}
        
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
        <h3>keywords:</h3>
        <div className="col-key-words">
          {job.keywords?.map((keyword, index) => (
            <span key={index}>{keyword}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JobPost;
