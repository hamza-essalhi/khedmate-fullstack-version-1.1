import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { FaBusinessTime, FaFacebookMessenger, FaInfo, FaRegUserCircle } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import { addMessage, clearMessagesWithDelay } from "../../toolkit/messages/messageActions";
import { clearRequest, clearRequestWithDelay, completeRequest, errorRequests, startRequest } from "../../toolkit/request/requestActions";
import api from "../../toolkit/auth/config";
import BasicsEmplyee from "../components/admin/BasicsEmplyee";
import ExperienceEmplyee from "../components/admin/ExperienceEmplyee";
import EducationEmplyee from "../components/admin/EducationEmplyee";
import ResumeEmplyee from "../components/admin/ResumeEmplyee";
import { generateUniqueId } from "../../utils/generateUnId";
const Application = () => {
    const navigate=useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch();
    const { lastRequest } = useSelector((state) => state.request);
    const messages = useSelector((state) => state.messages);
    const [delay] = useState(0);
    const [jobApplication, setJobApplication] = useState('')
    const [basics, setBasics] = useState(true);
    const [resume, setResume] = useState(false);
    const [education, setEducation] = useState(false);
    const [propsDelay, setDelay] = useState(0.7);
    const [experience, setExperience] = useState(false);
    const ref = useRef(null);
    const target = useInView(ref, { once: true });
    const animate = useAnimation();
    const [decision, setDecision] = useState({
        applicationStatus:'pending'
    });

    const transition = {
        duration: 0.5,
        delay: delay,
    };
    const handleProfileMenu = (target) => {
        setDelay(0);
        switch (target) {
            case "experience":
                setExperience(true);
                setEducation(false);
                setBasics(false);
                setResume(false);

                break;
            case "education":
                setExperience(false);
                setEducation(true);
                setBasics(false);
                setResume(false);

                break;
            case "resume":
                setExperience(false);
                setEducation(false);
                setBasics(false);
                setResume(true);
                break;
            default:
                setExperience(false);
                setEducation(false);
                setBasics(true);

        }
    };
    useEffect(() => {
        if (target) {
            animate.start("end");
        }
    }, [target, animate]);

    
    const handleChange= (e) => {
        const { name, value } = e.target;
        setDecision((prevDecision) => ({
          ...prevDecision,
          [name]: value,
        }));
    };
  
    const handleSubmit =async (e) => {
      e.preventDefault(); // Prevent the form from submitting normally
     
    dispatch(clearRequest())
    dispatch(startRequest());
    try {
      
      await api.put(`jobApplication/${id}`, decision);
      dispatch(completeRequest())
      dispatch(
        addMessage(`This job application has been successfully ${decision.applicationStatus}!`)
      );
      dispatch(clearMessagesWithDelay());
      dispatch(clearRequestWithDelay())
    } catch (error) {
      dispatch(errorRequests())
    }
    };
    useEffect(() => {
        const fetchFilteredJobs = async () => {
            try {
                const response = await api.get(`jobApplication/${id}`);

                const jobApplication = response.data.JobApplication;
                // Check if the response contains the error message
                if (!response.data.error) {
                    setJobApplication(jobApplication);

                }

                dispatch(clearRequestWithDelay());
            } catch (error) {

            }
        };



        fetchFilteredJobs();
    }, [lastRequest, dispatch,id]);
    document.title = `${jobApplication.firstName} ${jobApplication.lastName}`;
    const conversationId = generateUniqueId(`${jobApplication.jobOwner}${jobApplication.userId}`)
    const creatConversation= async(e)=>{
        e.preventDefault()
    const toUnit = {
        toUnit: jobApplication.userId
    }
    dispatch(clearRequest())
    dispatch(startRequest());

    await api.post(`conversations/create`, toUnit).then((res) => 
    {
        const data=res.data
     dispatch(completeRequest())
    navigate(`/chat/${data.conversation.conversionGeneId}`)
    }
    ).catch((e) => {
        dispatch(errorRequests())
        navigate(`/chat/${conversationId}`)})
    dispatch(clearRequestWithDelay())
    
    
    }
    return (
        <motion.div
            className="user job-application-container"
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
                className="row user-row-props"

            >
                <h5>Job Application id number : {jobApplication._id} </h5>
                <div className="user-top-row">
                    <img src={jobApplication.img} alt="" className="user-img" />
                    <div className="user-info">
                        <div> <h4>{jobApplication.firstName}</h4>
                            <h4>{jobApplication.lastName}</h4></div>
                        <div className="contact">
                            <h5>Phone : {jobApplication.employee?.phone}</h5>
                            <h5>Email : {jobApplication.employee?.email}</h5>
                        </div>
                    </div>
                    <div className="user-info statut">
                        <h4 onClick={creatConversation}>
                            <span className="chat-box">
                            <FaFacebookMessenger></FaFacebookMessenger>
                            </span>
                        </h4>
                        <h4><span className={
                            jobApplication.applicationStatus === "accepted"
                                ? "accepted"
                                : jobApplication.applicationStatus === "rejected"
                                    ? "rejected"
                                    : ""
                        }>{jobApplication.applicationStatus}</span></h4>
                    </div>
                </div>
            </motion.div>
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
                        <FaBusinessTime
                            className={
                                experience ? "user-profile-icon active" : "user-profile-icon"
                            }
                            onClick={() => handleProfileMenu("experience")}
                        ></FaBusinessTime>
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
                        <FaInfo
                            className={
                                resume ? "user-profile-icon active" : "user-profile-icon"
                            }
                            onClick={() => handleProfileMenu("resume")}
                        ></FaInfo>
                    </motion.div>
                </div>


            </motion.div>
            {basics && <BasicsEmplyee delay={propsDelay} jobApplication={jobApplication} />}
            {experience && <ExperienceEmplyee delay={propsDelay} jobApplication={jobApplication.employee.jobExperience[0]} />}
            {education && <EducationEmplyee delay={propsDelay} jobApplication={jobApplication.employee.education[0]} />}
            {resume && <ResumeEmplyee delay={propsDelay} jobApplication={jobApplication.employee} />}
            <motion.div
                className="row job-application-row-props"
                initial="start"
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

                animate={animate}
                transition={{
                    duration: 0.5,
                    delay: delay + 0.3,
                }}
            >
                <h3>Approve or Reject Application</h3>
                <h4>Please review the application and make a decision:</h4>
                <form action="" onSubmit={handleSubmit} >
                    <label >Decision:</label>
                    <select id="decision" name="applicationStatus" value={decision.applicationStatus} onChange={handleChange}>
                        <option >Select</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <button >Submit Decision</button>
                </form>

            </motion.div>
        </motion.div>
    );
}

export default Application;