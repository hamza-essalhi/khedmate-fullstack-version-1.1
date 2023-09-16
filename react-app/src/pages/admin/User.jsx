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
import { useSelector } from "react-redux";
import { ReaserchTable } from "../components/admin/ReaserchTable";
import { Table } from "../components/admin/Table";
import api from "../../toolkit/auth/config";
import { ReaserchJobsTable } from "../components/admin/ReaserchJobsTable";
import { useDispatch } from 'react-redux';
import { addMessage, clearMessagesWithDelay } from "../../toolkit/messages/messageActions";
import Message from "../components/Message";
import { clearRequest, clearRequestWithDelay, completeRequest, errorRequests, startRequest } from "../../toolkit/request/requestActions";

const User = () => {
  const { lastRequest } = useSelector((state) => state.request);

  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const [basics, setBasics] = useState(true);
  const [auth, setAuth] = useState(false);
  const [education, setEducation] = useState(false);

  const [experience, setExperience] = useState(false);
  const [jobApplication, setJobApplication] = useState('')
  const [jobs, setJobs] = useState('')
  const [resume, setResume] = useState(false);
  const [delay] = useState(0);
  const [propsDelay, setDelay] = useState(0.7);
  const ref = useRef(null);
  const target = useInView(ref, { once: true });
  const animate = useAnimation();
  const user = useSelector((state) => state.auth.user);
  const [selectedCities, setSelectedCities] = useState("");
  const [selectedDomains, setSelectedDomains] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [paramsError,setPramsError]=useState(false)
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

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        setPramsError(false)
        const params = {
          search: searchQuery,
          city: selectedCities,
          domain: selectedDomains,
          education: selectedEducation,
        }
        const response = await api.get("jobApplication");
        const jobResponse = await api.get("jobs/userJobs",{ params });
        const jobApplication = response.data.JobApplications;
        const jobs = jobResponse.data.jobs;
        

        // Check if the response contains the error message
        if (!response.data.error) {
          setJobApplication(jobApplication);
        }
        if (!jobResponse.data.error) {
          setJobs(jobs);
        }
        else{
          setPramsError(true)
        }

        dispatch(clearRequestWithDelay());
      } catch (error) {

      }
    };



    fetchFilteredJobs();
  }, [lastRequest, dispatch,selectedCities,selectedDomains,selectedEducation,searchQuery]);

  const handleSelectChangeCities = (value) => {
    setSelectedCities(value);
  };

  const handleSelectChangeDomain = (value) => {
    setSelectedDomains(value);

  };
  const handleSelectChangeEducation = (value) => {
    setSelectedEducation(value);

  };
  const handleSelectChangeSearch = (value) =>{
    setSearchQuery(value)
  }
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
    dispatch(clearRequest())
    dispatch(startRequest());
    try {
      // Delete the job application
      await api.delete(`jobApplication/${jobApplicationId}`);
      dispatch(completeRequest())
      dispatch(addMessage("Success! Your job has been deleted."));
      dispatch(clearMessagesWithDelay());
      dispatch(clearRequestWithDelay())
    } catch (error) {
      dispatch(errorRequests())
    }
  };

  const handleDeleteJob = async (jobId) => {
    dispatch(clearRequest())
    dispatch(startRequest());
    try {
      await api.delete(`jobs/${jobId}`);
      dispatch(completeRequest())
      dispatch(addMessage("Success! Your job application has been deleted."));
      dispatch(clearMessagesWithDelay());
      dispatch(clearRequestWithDelay())

    } catch (error) {
      dispatch(errorRequests())
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
      <Message messages={messages} />
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
        {!user.user.research ? (
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

      {!user.user.research ? (
        <>
          {basics && <Basics delay={propsDelay} user={user.user} />}
          {auth && <Auth delay={propsDelay} user={user.user} />}
          {education && <Education delay={propsDelay} user={user.user} />}
          {experience && <Experience delay={propsDelay} user={user.user} />}
          {resume && <Resume delay={propsDelay} user={user.user} />}
        </>
      ) : (
        <>
          {basics && <Basics delay={propsDelay} user={user.user} />}
          {auth && <Auth delay={propsDelay} user={user.user} />}
          {education && <AddJob delay={propsDelay} user={user.user} />}
        </>
      )}
      {
        user.user.research ? <ReaserchTable data={jobApplication} onDelete={handleDelete} /> : <Table data={jobApplication} onDelete={handleDelete} />
      }

      {
        user.user.research && <ReaserchJobsTable data={jobs} onDelete={handleDeleteJob} selectChangeSearch={handleSelectChangeSearch} selectChangeCities={handleSelectChangeCities} selectChangeDomain={handleSelectChangeDomain} selectChangeEducation={handleSelectChangeEducation} paramsError={paramsError} />
      }

    </motion.div>
  );
};

export default User;
