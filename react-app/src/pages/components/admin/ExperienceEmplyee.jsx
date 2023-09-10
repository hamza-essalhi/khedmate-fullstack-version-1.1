import { motion } from "framer-motion";


const ExperienceEmplyee = ({ delay,jobApplication}) => {
  
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

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month because months are zero-indexed
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
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
          Education Info
        </h3>
        <div> 
          <h4><span>Company</span><span>:</span>{jobApplication.company}</h4>
          <h4><span>Domain</span><span>:</span>{jobApplication.domain}</h4></div>
       
          <h4><span>Position</span><span>:</span> {jobApplication.position}</h4>
          <h4><span>From </span><span>:</span> {formatDate(jobApplication.startDate)}</h4>
          <h4><span>To</span><span>:</span> {formatDate(jobApplication.endDate)}</h4>
     
      </div>
    </motion.div>
  );
};

export default ExperienceEmplyee;
