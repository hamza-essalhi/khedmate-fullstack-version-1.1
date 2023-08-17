import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import userImage from "../../../images/user.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const Basics = ({ delay,userData}) => {
  const {user}=true
  const [phoneMatch, setPhoneMatch] = useState(true);
  const newDelay = delay;
  const [phone, setPhone] = useState("");
  const [uploadForm, setUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    profile_img: "",
  });
  useEffect(() => {
    if (isNaN(phone)) {
      setPhoneMatch(true);
    } else {
      setPhoneMatch(false);
    }
    setPhone(formData.phone)
  }, [phone,formData.phone]);
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
  useEffect(() => {
    // If user data is available, update the form data state
    if (userData ) {
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone: userData.phone || "",
        address: userData.address || "",
        profile_img: userData.profile_img || "",
      });
    }
  }, [userData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setPhone(formData.phone)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.access}`, // Assuming "user.access" is the JWT access token
      }
    };
    axios
      .put("http://localhost:8000/api/user",config,formData)
      .then((response) => {
        const userResponse = response.data;
        console.log(userResponse)

        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelUploadFrom = () => {
    setUploadForm(!uploadForm);
  };
 
console.log(user)

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
        <form action="">
          <motion.div
            className="image-box"
            variants={formProps}
            initial="start"
            animate="end"
            transition={{
              duration: 0.5,
              delay: newDelay + 0.6,
            }}
          >
            <img src={userImage} alt="" />
            <MdEdit className="edit-icon" onClick={handelUploadFrom}></MdEdit>
          </motion.div>
          {uploadForm && (
            <motion.div
              className="form-content form-upload"
              variants={formProps}
              initial="start"
              animate="end"
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
            >
              <label htmlFor="">Upload Profile Image</label>
              <input type="file" name="profile_img"  placeholder="John..." />
            </motion.div>
          )}
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
            <label htmlFor="">First Name</label>
            <input type="text" name="first_name" defaultValue={userData?.first_name}    onChange={handleChange} />
            <label htmlFor="">Last Name</label>
            <input type="text" name="last_name" defaultValue={userData?.last_name} placeholder="edwrd..." onChange={handleChange} />
            <label htmlFor="">Phone</label>

            <input
              type="tel"
              name="phone"
              className={phoneMatch ? "input-error" : ""}
              defaultValue={userData?.phone}
              onChange={handleChange}
              placeholder="066666.."
            />
            <label htmlFor="">Address</label>
            <textarea
              name="address"
              id=""
              cols="30"
              rows="10"
              placeholder="106, rue Taha Houcine -ex Galilee, Grand Casablanca"
              defaultValue={userData?.address}
              onChange={handleChange}
            ></textarea>
            <div className="btn">
              <button onClick={handleSubmit}  type="button">
                Edite
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default Basics;
