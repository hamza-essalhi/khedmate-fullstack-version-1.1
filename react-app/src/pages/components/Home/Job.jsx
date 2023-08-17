import { useEffect, useRef, useState } from "react";
import userImage from "../../../images/user.jpg";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import axios from "axios";

const Job = (props) => {
  const job = props.job;
  const [like, setLike] = useState(false);
  const [user,setUser]=useState([])
  const ref = useRef(null);
  const target = useInView(ref, { once: true });
  const animate = useAnimation();
  const transition = {
    duration: 0.5,
    delay: 0.1,
  };

  useEffect(() => {

    axios
      .get(`http://localhost:8000/api/user/${job.user}`)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [job.user]);
  useEffect(() => {
    if (target) {
      animate.start("end");
    }
  }, [target,animate]);
  useEffect(() => {
    try {
      const likedJobs = JSON.parse(localStorage.getItem("likedJobs")) || [];
      const liked = likedJobs.filter((job) => job.id === parseInt(job.id));
      setLike(liked[0].liked);
    } catch {
      setLike(false);
    }
  }, [job?.id]);
  const handleLike = () => {
    setLike(!like);
    const likedJobs = JSON.parse(localStorage.getItem("likedJobs")) || [];
    const index = likedJobs.findIndex((j) => j.id === job?.id);

    if (index !== -1) {
      likedJobs[index].liked = !likedJobs[index].liked;
    } else {
      likedJobs.push({ id: job?.id, liked: like });
    }

    localStorage.setItem("likedJobs", JSON.stringify(likedJobs));
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
          <img src={userImage} alt="" />
          <div className="sub-col">
            <h3>{job?.jobe_title}</h3>
            <span>
              Post by {user.first_name} {user.last_name}
            </span>
            <span>{job?.city}</span>
          </div>
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
          <span>{job?.date}</span>
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
        <span>{job?.job_description.slice(0, 200)}...</span>

        <Link to={"job/" + job?.id}>Apply Now</Link>
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
          {job?.key_words.map((keyword, index) => (
            <span key={index}>{keyword}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Job;
