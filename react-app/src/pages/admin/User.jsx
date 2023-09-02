import { useEffect, useRef, useState } from "react";

import { motion, useAnimation, useInView } from "framer-motion";
import { FaRegUserCircle } from "react-icons/fa";
import { BsFillShieldLockFill, BsPersonWorkspace } from "react-icons/bs";
import { IoMdDocument, IoMdSchool } from "react-icons/io";
import Basics from "../components/admin/Basics";
import Auth from "../components/admin/Auth";
import Education from "../components/admin/Education";
import Experience from "../components/admin/Experience";
import Resume from "../components/admin/Resume";
import AddJob from "../components/admin/AddJob";
import jobs from "../../../src/data/jobs1.json"
import { useParams } from "react-router-dom";
import {useSelector } from "react-redux";
import { ReaserchTable } from "../components/admin/ReaserchTable";
import { Table } from "../components/admin/Table";
import api from "../../toolkit/auth/config";
import { ReaserchJobsTable } from "../components/admin/ReaserchJobsTable";
const User = () => {
  const { id } = useParams();
  const [basics, setBasics] = useState(true);
  const [auth, setAuth] = useState(false);
  const [education, setEducation] = useState(false);

  const [experience, setExperience] = useState(false);
  const [jobApplication,setJobApplication]=useState('')
  const [jobs,setJobs]=useState('')
  const [resume, setResume] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [isCreatedNewJob,setCreatedNewJob]=useState(false)
  const [delay] = useState(0);
  const [propsDelay, setDelay] = useState(0.7);
  const ref = useRef(null);
  const target = useInView(ref, { once: true });
  const animate = useAnimation();
  const user = useSelector((state) => state.auth.user);
  const transition = {
    duration: 0.5,
    delay: delay,
  };
  useEffect(() => {
    if (target) {
      animate.start("end");
    }
  }, [target, animate]);

  document.title = `${user.user.firstName} ${user.user.lastName}`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchFilteredJobs = async () => {
      setError(false)
      setLoading(false)

      try
       {

          setLoading(true)
          const response = await api.get("jobApplication");
          const jobResponse= await api.get("jobs/userJobs");
          const jobApplication = response.data.JobApplications
          const jobs = jobResponse.data.jobs
        setJobApplication(jobApplication);
        setJobs(jobs)
        setLoading(false)
        
  
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    };

    fetchFilteredJobs();
    
  },[isCreatedNewJob]);
  const handleProfileMenu = (target) => {
    setDelay(0);
    switch (target) {
      case "experience":
        setExperience(true);
        setAuth(false);
        setEducation(false);
        setBasics(false);
        setResume(false);
        break;

      case "auth":
        setExperience(false);
        setAuth(true);
        setEducation(false);
        setBasics(false);
        setResume(false);
        break;
      case "education":
        setExperience(false);
        setAuth(false);
        setEducation(true);
        setBasics(false);
        setResume(false);
        break;
      case "resume":
        setExperience(false);
        setAuth(false);
        setEducation(false);
        setBasics(false);
        setResume(true);
        break;
      default:
        setExperience(false);
        setAuth(false);
        setEducation(false);
        setBasics(true);
        setResume(false);
    }
  };
  const handleDelete = async (jobApplicationId) => {
    try {
      // Delete the job application
      await api.delete(`jobApplication/${jobApplicationId}`);
      const updatedJobApplications = jobApplication.filter((jobApp) => jobApp._id !== jobApplicationId);
    setJobApplication(updatedJobApplications);
    } catch (error) {
      
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      // Delete the job application
      await api.delete(`jobs/${jobId}`);
      const updatedJobApplications = jobApplication.filter((jobApp) => jobApp._id !== jobId);
      const updatedJobs = jobs.filter((job) => job._id !== jobId);
    setJobApplication(updatedJobApplications);
    setJobs(updatedJobs)
      
    } catch (error) {
    }
  };

  

  return (
    <motion.div
      className="user"
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
        className="row user-profile-menu"
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
          delay: delay + 0.3,
        }}
      >
        {employee ? (
          <div className="col">
            <motion.div
              variants={
                !basics
                  ? {
                      start: {
                        opacity: 0,
                        y: -100,
                      },
                      end: {
                        opacity: 1,
                        y: 0,
                      },
                    }
                  : {
                      start: {
                        opacity: 0,
                        y: -100,
                      },
                      end: {
                        opacity: 1,
                        y: 20,
                      },
                    }
              }
              initial="start"
              animate="end"
              transition={
                !basics
                  ? {
                      duration: 0.5,
                      delay: delay + 0.2,
                    }
                  : {
                      duration: 0.5,
                      delay: 0.2,
                    }
              }
            >
              <FaRegUserCircle
                className={
                  basics ? "user-profile-icon active" : "user-profile-icon"
                }
                onClick={() => handleProfileMenu("basics")}
              ></FaRegUserCircle>
            </motion.div>
            <motion.div
              variants={
                !auth
                  ? {
                      start: {
                        opacity: 0,
                        y: -100,
                      },
                      end: {
                        opacity: 1,
                        y: 0,
                      },
                    }
                  : {
                      start: {
                        opacity: 0,
                        y: -100,
                      },
                      end: {
                        opacity: 1,
                        y: 20,
                      },
                    }
              }
              initial="start"
              animate="end"
              transition={
                !auth
                  ? {
                      duration: 0.5,
                      delay: delay + 0.2,
                    }
                  : {
                      duration: 0.5,
                      delay: 0.2,
                    }
              }
            >
              <BsFillShieldLockFill
                className={
                  auth ? "user-profile-icon active" : "user-profile-icon"
                }
                onClick={() => handleProfileMenu("auth")}
              ></BsFillShieldLockFill>
            </motion.div>
            <motion.div
              variants={
                !education
                  ? {
                      start: {
                        opacity: 0,
                        y: -100,
                      },
                      end: {
                        opacity: 1,
                        y: 0,
                      },
                    }
                  : {
                      start: {
                        opacity: 0,
                        y: -100,
                      },
                      end: {
                        opacity: 1,
                        y: 20,
                      },
                    }
              }
              initial="start"
              animate="end"
              transition={
                !education
                  ? {
                      duration: 0.5,
                      delay: delay + 0.2,
                    }
                  : {
                      duration: 0.5,
                      delay: 0.2,
                    }
              }
            >
              <IoMdSchool
                className={
                  education ? "user-profile-icon active" : "user-profile-icon"
                }
                onClick={() => handleProfileMenu("education")}
              ></IoMdSchool>
            </motion.div>
            <motion.div
              variants={
                !experience
                  ? {
                      start: {
                        opacity: 0,
                        y: -100,
                      },
                      end: {
                        opacity: 1,
                        y: 0,
                      },
                    }
                  : {
                      start: {
                        opacity: 0,
                        y: -100,
                      },
                      end: {
                        opacity: 1,
                        y: 20,
                      },
                    }
              }
              initial="start"
              animate="end"
              transition={
                !experience
                  ? {
                      duration: 0.5,
                      delay: delay + 0.2,
                    }
                  : {
                      duration: 0.5,
                      delay: 0.2,
                    }
              }
            >
              <BsPersonWorkspace
                className={
                  experience ? "user-profile-icon active" : "user-profile-icon"
                }
                onClick={() => handleProfileMenu("experience")}
              ></BsPersonWorkspace>
            </motion.div>
            <motion.div
              variants={
                !resume
                  ? {
                      start: {
                        opacity: 0,
                        y: -100,
                      },
                      end: {
                        opacity: 1,
                        y: 0,
                      },
                    }
                  : {
                      start: {
                        opacity: 0,
                        y: -100,
                      },
                      end: {
                        opacity: 1,
                        y: 20,
                      },
                    }
              }
              initial="start"
              animate="end"
              transition={
                !resume
                  ? {
                      duration: 0.5,
                      delay: delay + 0.2,
                    }
                  : {
                      duration: 0.5,
                      delay: 0.2,
                    }
              }
            >
              <IoMdDocument
                className={
                  resume ? "user-profile-icon active" : "user-profile-icon"
                }
                onClick={() => handleProfileMenu("resume")}
              ></IoMdDocument>
            </motion.div>
          </div>
        ) : (
          <>
            <div className="col">
              <motion.div
                variants={
                  !basics
                    ? {
                        start: {
                          opacity: 0,
                          y: -100,
                        },
                        end: {
                          opacity: 1,
                          y: 0,
                        },
                      }
                    : {
                        start: {
                          opacity: 0,
                          y: -100,
                        },
                        end: {
                          opacity: 1,
                          y: 20,
                        },
                      }
                }
                initial="start"
                animate="end"
                transition={
                  !basics
                    ? {
                        duration: 0.5,
                        delay: delay + 0.2,
                      }
                    : {
                        duration: 0.5,
                        delay: 0.2,
                      }
                }
              >
                <FaRegUserCircle
                  className={
                    basics ? "user-profile-icon active" : "user-profile-icon"
                  }
                  onClick={() => handleProfileMenu("basics")}
                ></FaRegUserCircle>
              </motion.div>
              <motion.div
                variants={
                  !auth
                    ? {
                        start: {
                          opacity: 0,
                          y: -100,
                        },
                        end: {
                          opacity: 1,
                          y: 0,
                        },
                      }
                    : {
                        start: {
                          opacity: 0,
                          y: -100,
                        },
                        end: {
                          opacity: 1,
                          y: 20,
                        },
                      }
                }
                initial="start"
                animate="end"
                transition={
                  !auth
                    ? {
                        duration: 0.5,
                        delay: delay + 0.2,
                      }
                    : {
                        duration: 0.5,
                        delay: 0.2,
                      }
                }
              >
                <BsFillShieldLockFill
                  className={
                    auth ? "user-profile-icon active" : "user-profile-icon"
                  }
                  onClick={() => handleProfileMenu("auth")}
                ></BsFillShieldLockFill>
              </motion.div>
              <motion.div
                variants={
                  !education
                    ? {
                        start: {
                          opacity: 0,
                          y: -100,
                        },
                        end: {
                          opacity: 1,
                          y: 0,
                        },
                      }
                    : {
                        start: {
                          opacity: 0,
                          y: -100,
                        },
                        end: {
                          opacity: 1,
                          y: 20,
                        },
                      }
                }
                initial="start"
                animate="end"
                transition={
                  !education
                    ? {
                        duration: 0.5,
                        delay: delay + 0.2,
                      }
                    : {
                        duration: 0.5,
                        delay: 0.2,
                      }
                }
              >
                <IoMdSchool
                  className={
                    education ? "user-profile-icon active" : "user-profile-icon"
                  }
                  onClick={() => handleProfileMenu("education")}
                ></IoMdSchool>
              </motion.div>
            </div>
          </>
        )}
      </motion.div>

      {employee ? (
        <>
          {basics && <Basics delay={propsDelay} user={user.user} />}
          {auth && <Auth delay={propsDelay} user={user.user}/>}
          {education && <Education delay={propsDelay} user={user.user}/>}
          {experience && <Experience delay={propsDelay} user={user.user}/>}
          {resume && <Resume delay={propsDelay} user={user.user}/>}
        </>
      ) : (
        <>
          {basics && <Basics delay={propsDelay} user={user.user} />}
          {auth && <Auth delay={propsDelay} user={user.user}/>}
          {education && <AddJob delay={propsDelay} user={user.user} setCreatedNewJob={setCreatedNewJob}/>}
        </>
      )}
      {
        user.user.research ? <ReaserchTable data={jobApplication} onDelete={handleDelete}/>:<Table data={jobApplication}/>
      }

{
        user.user.research && <ReaserchJobsTable data={jobs} onDelete={handleDeleteJob}/>
      }
    </motion.div>
  );
};

export default User;
