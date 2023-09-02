import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Select from "../Select";
import cities from "../../../data/cities.json";
import domain from "../../../data/dmains.json";
import education from "../../../data/education.json";
import api from "../../../toolkit/auth/config";
const AddJob = ({ delay,setCreatedNewJob}) => {
  const newDelay = delay;
  const [months,setMonths]=useState('')
  const [years,setYears]=useState('')
  const [phoneMatch, setPhoneMatch] = useState(true);
  const [emailMatch, setEmailMatch] = useState(true);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [selectedEducation, setEducation] = useState("");
  const [selectedDomain, setDomain] = useState("");
  const [error, setError] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    experience: [],
    city: '',
    type: '',
    company: '',
    educationLevel: '',
    salary: 0,
    keywords: [],
    contactNumber:'',
    jobDescription:'',
    contactEmail:''
  });
 
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

  const formProps = {
    start: {
      opacity: 0,
      y: -30,
      scale: 0.9,
    },
    end: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title) {
      errors.title = 'Title is required';
    }
    if (!formData.domain) {
      errors.domain = 'Domain is required';
    }
    if (formData.experience.length <= 0) {
      errors.experience = 'Experience is required';
    }
    if (!formData.city) {
      errors.city = 'City is required';
    }
    if (!formData.type) {
      errors.type = 'Type is required';
    }
    if (!formData.company) {
      errors.company = 'Company is required';
    }
    if (!formData.educationLevel) {
      errors.educationLevel = 'Education Level is required';
    }
    if (formData.salary <= 0) {
      errors.salary = 'Salary must be greater than 0';
    }
    if (!formData.contactNumber) {
      errors.contactNumber = 'Contact Number is required';
    }
    if (!formData.jobDescription) {
      errors.jobDescription = 'Job Description is required';
    }
    if (!formData.contactEmail) {
      errors.contactEmail = 'Contact Email is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const handleSelectChangeCities = (value) => {
    setCity(value)
  };
  const handleSelectChangeDomain = (value) => {
    setDomain(value)
  };
  const handleSelectChangeEducation = (value) => {
    setEducation(value)

  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if( name === 'salary'){
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parseInt(value),
      }));
    }
    else{
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    
    
    const forbiddenDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "aol.com",
      "outlook.com",
      "icloud.com",
      "mail.com",
      "protonmail.com",
      "yandex.com",
      "zoho.com",
      "inbox.com",
      "gmx.com",
      "fastmail.com",
      "tutanota.com",
      "mail.ru",
      "live.com",
      "msn.com",
      "me.com",
      "qq.com",
      "163.com",
      "126.com",
      "yeah.net",
      "sina.com",
      "sohu.com",
      "aliyun.com",
      "foxmail.com",
      "tom.com",
      "vip.163.com",
      "vip.126.com",
      "vip.qq.com",
      "vip.sina.com",
      "vip.sohu.com",
      "vip.foxmail.com",
      "vip.tom.com",
    ];

    const forbiddenDomain = forbiddenDomains.find((domain) => email.endsWith("@" + domain))
    if (isNaN(phone) && phone !== '') {
      setPhoneMatch(true)
    }
    else {
      setPhoneMatch(false)
    }

    if (forbiddenDomain || email==='') {
      setEmailMatch(false)
    } else {
      setEmailMatch(true)
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      experience:[months,years],
      contactEmail:email,
      contactNumber:phone,
      educationLevel:selectedEducation,
      domain:selectedDomain,
      city:city
    }));

    
    
    
  }, [phone, email, months, years, selectedEducation, selectedDomain, city]);
  

  useEffect(() => {
    const errors = {};

    if (!formData.title) {
      errors.title = 'Title is required';
    }
    if (!formData.domain) {
      errors.domain = 'Domain is required';
    }
    if (formData.experience.length < 1) {
      errors.experience = 'Experience is required';
    }
    if (!formData.city) {
      errors.city = 'City is required';
    }
    if (!formData.type) {
      errors.type = 'Type is required';
    }
    if (!formData.company) {
      errors.company = 'Company is required';
    }
    if (!formData.educationLevel) {
      errors.educationLevel = 'Education Level is required';
    }
    if (formData.salary <= 0 || formData.salary ==='') {
      errors.salary = 'Salary must be greater than 0';
    }
    if (!formData.contactNumber) {
      errors.contactNumber = 'Contact Number is required';
    }
    if (!formData.jobDescription) {
      errors.jobDescription = 'Job Description is required';
    }
    if (!formData.contactEmail) {
      errors.contactEmail = 'Contact Email is required';
    }
    else{
      setError(false)
    }

    setFormErrors(errors); // Call validateForm when formData changes
  }, [formData.title, formData.domain, formData.experience, formData.city, formData.type, formData.company, formData.educationLevel, formData.salary, formData.contactNumber, formData.jobDescription, formData.contactEmail])


  const handleSubmit =async (e) => {
    e.preventDefault();
    
    console.log(formData)
    if(validateForm()){
      await api.post('jobs/create',formData).then((res)=>console.log(res.data)).catch((e)=>console.log(e))
      setCreatedNewJob(true)
    }
    else{
      setError(true)
    }
   
  };
 
 


  return (
    <motion.div
      className="row user-row-props"
      variants={animationProps}
      initial="start"
      animate="end"
      transition={{
        duration: 0.5,
        delay: newDelay + 0.1,
      }}
    >
      <div className="col">
      <motion.h1
        className="form-content"
        variants={formProps}
        initial="start"
        animate="end"
        transition={{
          duration: 0.5,
          delay: newDelay + 0.8,
        }}>
          Add New Job
        </motion.h1>
        <form action="">
         
          <motion.div
            className="form-content"
            variants={formProps}
            initial="start"
            animate="end"
            transition={{
              duration: 0.5,
              delay: newDelay + 0.9,
            }}
          >
            <label htmlFor="">title</label>
            <input type="text" name="title" placeholder="Front-end..." onChange={handleChange} />
            {formErrors.title&&<motion.h5
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
                {formErrors.title}
              </motion.h5>}
            <label htmlFor="">Company Name</label>
            <input type="text" name="company" placeholder="CapDat..." onChange={handleChange} />
            {formErrors.company&&<motion.h5
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
                {formErrors.company}
              </motion.h5>}
            <label htmlFor="">Type</label>
            <input type="text" name="type" placeholder="Full-time..." onChange={handleChange} />
            {formErrors.type&&<motion.h5
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
                {formErrors.type}
              </motion.h5>}
            
            <label htmlFor="">Months Of Experience  </label>
            <input type="number" minvalue='1' maxvalue='12' name="field_of_study" placeholder="12 Months..." onChange={(e)=>setMonths(e.target.value)} />
            <label htmlFor="">Years Of Experience  </label>
            <input type="number" minvalue='1' name="field_of_study" placeholder="2 Years..." onChange={(e)=>setYears(e.target.value)} />
            {formErrors.experience&&<motion.h5
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
                {formErrors.experience}
              </motion.h5>}
            <label htmlFor="">City</label>
            <Select
                options={cities.filter(city => city.value !== "All")}
                defaultValue="Select"
                onChange={handleSelectChangeCities}
                classValue ='custom-select-3'
              />
               {formErrors.city&&<motion.h5
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
                {formErrors.city}
              </motion.h5>}
            <label htmlFor="">Education</label>
            <Select
                options={education.filter(e => e.value !== "All")}
                defaultValue="Select"
                onChange={handleSelectChangeEducation}
                classValue ='custom-select-2'
              />
               {formErrors.educationLevel&&<motion.h5
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
                {formErrors.educationLevel}
              </motion.h5>}
             <label htmlFor="">Domin</label>
            <Select
                options={domain.filter(e => e.value !== "All")}
                defaultValue="Select"
                onChange={handleSelectChangeDomain}
                classValue ='custom-select-1'
              /> 
               {formErrors.domain&&<motion.h5
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
                {formErrors.domain}
              </motion.h5>}
            <label htmlFor="">Salary </label>
            <input type="number" minvalue='0' name="salary" placeholder="2450Dh" onChange={handleChange} />
            {formErrors.salary&&<motion.h5
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
                {formErrors.salary}
              </motion.h5>}
            <label htmlFor="">Contact Number</label>
            <input type="tel" name="contactNumber" className={phoneMatch ? 'input-error' : ''} placeholder="0666666666" onChange={(e)=>setPhone(e.target.value)} />
            {phoneMatch&&<motion.h5
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
                Pleas Enter A Valide Phone Number
              </motion.h5>}
            <label htmlFor="">Contact Email</label>
            <input type="email" name="contactEmail" className={emailMatch ? 'input-error' : ''} placeholder="name@domain.com" onChange={(e)=>setEmail(e.target.value)} />
            {emailMatch&&<motion.h5
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
                Pleas Enter A Valide Email
              </motion.h5>}
            <label htmlFor="">Job Description </label>
            <textarea name="jobDescription" id="" cols="30" rows="10" placeholder="Description..." onChange={handleChange}></textarea>
            {formErrors.jobDescription&&<motion.h5
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
                {formErrors.jobDescription}
              </motion.h5>}
            <div className="btn">
              <button onClick={handleSubmit}  type="button">
                Add 
              </button>
            </div>

            {error&&<motion.h5
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
                Form data is not valid.
              </motion.h5>}
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddJob;