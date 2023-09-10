import { motion } from "framer-motion";


const ResumeEmplyee = ({ delay,jobApplication}) => {
  
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
          Resume and Motivation Letter 
        </h3>
        <div> 
          <h4><span>Cv Link</span><span>:</span>{jobApplication.resume}</h4>
          <h4><span>Motivation Letter</span><span>:</span>{jobApplication.motivationLetter}</h4></div>
      
      </div>
    </motion.div>
  );
};

export default ResumeEmplyee;
