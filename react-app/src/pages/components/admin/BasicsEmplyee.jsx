import { motion } from "framer-motion";


const BasicsEmplyee = ({ delay, jobApplication }) => {

  const newDelay = delay;


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





  return (
    <motion.div
      className="row job-application-row-props"
      variants={animationProps}
      initial="start"
      animate="end"
      transition={{
        duration: 0.5,
        delay: newDelay + 0.1,
      }}
    >
      <div className="col">
        <h3>
          Basic Emplyee Info
        </h3>
        <div> 
          <h4><span>First Name</span><span>:</span>{jobApplication.firstName}</h4>
          <h4><span>Last Name</span><span>:</span>{jobApplication.lastName}</h4></div>
       
          <h4><span>Phone</span><span>:</span> {jobApplication.employee?.phone}</h4>
          <h4><span>Email</span><span>:</span> {jobApplication.employee?.email}</h4>
     
      </div>
    </motion.div>
  );
};

export default BasicsEmplyee;
