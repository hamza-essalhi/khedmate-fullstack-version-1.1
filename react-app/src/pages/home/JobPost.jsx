import { useEffect, useRef, useState } from "react";
import jobImage from "../../images/user.jpg";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion, useAnimation, useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import api from "../../toolkit/auth/config";
import { startRequest, completeRequest, errorRequests, clearRequestWithDelay, clearRequest } from "../../toolkit/request/requestActions";
import Loading from "../components/Loading";
import { addMessage, clearMessagesWithDelay } from "../../toolkit/messages/messageActions";
import Message from "../components/Message";
import moment from "moment";
import { IoMdMail,  IoMdPhonePortrait } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

const JobPost = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const { isLoading, errorRequest, lastRequest } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const logedUser = useSelector((state) => state.auth.user?.user);
  const [user, setUser] = useState('')
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
  }, [id, lastRequest]);

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


  const hanleSubmit = async () => {
    dispatch(clearRequest())
    try {
      dispatch(startRequest());
      await api.post(`jobApplication/create/${job._id}`).then(() => {
        dispatch(completeRequest())
        dispatch(addMessage('Congratulations, your job application has been successfully sent'));
      }).catch((e) => dispatch(errorRequests()))

      dispatch(clearRequestWithDelay())
      dispatch(clearMessagesWithDelay());
    }
    catch {
      dispatch(errorRequests())
    }
  }
  useEffect(() => {
    
    setFormattedDate(moment(job.createdAt).fromNow());
  }, [job.createdAt]);

  const handleDelete = async () => {
    
    try {
      await api.delete(`jobs/${job._id}`);
      dispatch(addMessage("Success! ",job.title," has been deleted."));
      dispatch(clearMessagesWithDelay());
      navigate('/')

    } catch (error) {
      dispatch(errorRequests())
    }
  };
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
          x: 0,
        },
      }}
      initial="start"
      animate={animate}
      transition={transition}
    >
      <Message messages={messages} />
      <div className="sub-row">
      
      <motion.div
          className="col top"
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
          <h2>Preview</h2>
          {(isAuthenticated && logedUser._id===job.userId) && <FaTrash className="delete-btn" onClick={handleDelete}></FaTrash> }
        </motion.div>
        
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
          
          
          <div className="sub-col sub-col-info">
          <img src={user?.img ? user.img : jobImage} alt="" />
         <div className="info">
         <span>{job.ownerFirstName} {job.ownerLastName}</span>
            <span>{job.city}</span>
            <span> {formattedDate}</span>
         </div>
            
          </div>
          
          <motion.div
          className="sub-col sub-col-info sub-col-contact"
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
          <div className="info">
          <span><IoMdPhonePortrait className="contact-icon"></IoMdPhonePortrait>{job.contactNumber}</span>
<span><IoMdMail  className="contact-icon"></IoMdMail>{job.contactEmail}</span>
          </div>
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
        </motion.div>
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
        <h2>Overview</h2>
        <span>{job.job_description}</span>
        <div className="sub-row">
        <div className="sub-col">
          <h3>What we are loocking for ?</h3>
          <span>{job.jobDescription}</span>
        </div>
        <div className="sub-col">
          <h3>Requirement Skills</h3>
              <ul>
              {job.keywords?.map((keyword, index) => (
                <li key={index}>
                  {keyword}
                </li>
                ))}
              </ul>
        </div>
        <div className="sub-col">
          <h3>What are the benefits offered with the {job.title}?</h3>
          <ul>
            <li>Salary: {job.salary} Moroccan Dirhams (DH)</li>
            <li>Contract Type {job.type}</li>
            <li>Experience of {job.experience}</li>
            <li>We Need {job.educationLevel} </li>
          </ul>
        </div>
        
        </div>
        <div className="sub-col col-apply">
        {(isAuthenticated && !logedUser.research) && <button onClick={hanleSubmit} className="apply">Apply Now</button>
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
        </div>

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
