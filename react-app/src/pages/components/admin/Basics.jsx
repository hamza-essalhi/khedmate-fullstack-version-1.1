import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import userImage from "../../../images/user.jpg";
import { useEffect, useState } from "react";
import { startRequest, completeRequest, errorRequests, clearRequestWithDelay, clearRequest } from '../../../toolkit/request/requestActions';
import { addMessage, clearMessagesWithDelay } from "../../../toolkit/messages/messageActions";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../../toolkit/auth/authService";
import Resizer from "react-image-file-resizer";
const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
          200,
          200
    );
  });
const Basics = ({ delay,user}) => {
  const { isLoading, errorRequest } = useSelector((state) => state.request);
  
  const dispatch = useDispatch();

  const [phoneMatch, setPhoneMatch] = useState(true);
  const newDelay = delay;
  const [phone, setPhone] = useState("");
  const [uploadForm, setUploadForm] = useState(false);
  const [img,setImg]=useState('')
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    img: "",
  });
  useEffect(() => {
    if (isNaN(phone)) {
      setPhoneMatch(true);
    } else {
      setPhoneMatch(false);
    }
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      img:img
    }));

    setPhone(formData.phone)

  }, [formData.phone,img,phone]);
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
    if (user ) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        address: user.address || "",
        img: user.img || "",
      });
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      img:img,
      phone:phone,
      [name]: value,
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearRequest());
    dispatch(startRequest());
    const nonEmptyFormData = {};

    // Iterate through the formData object and add non-empty values to nonEmptyFormData
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key].trim() !== "") {
        nonEmptyFormData[key] = formData[key];
      }
    }
    try {
     
      await authService.updateUser(user._id, nonEmptyFormData);
      dispatch(completeRequest());
      dispatch(addMessage('User updated successfully!'));
      dispatch(clearRequestWithDelay());
      dispatch(clearMessagesWithDelay());
      setTimeout(() => {
        window.location.reload();
      }, 2100); // 3000 milliseconds (3 seconds)
    } catch (error) {
      dispatch(errorRequests());
    }

  };
  const handelUploadFrom = () => {
    setUploadForm(!uploadForm);
  };

  const handleImageInputChange = async (e) => {
    
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      console.log(image)
      setImg(image)
    } catch (err) {
      console.log(err);
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
            <img src={user?.img ? user.img :userImage} alt="" />
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
              <input type="file" name="img" accept="image/*" onChange={handleImageInputChange} />
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
            <input type="text" name="firstName" defaultValue={user?.firstName}    onChange={handleChange} />
            <label htmlFor="">Last Name</label>
            <input type="text" name="lastName" defaultValue={user?.lastName} placeholder="edwrd..." onChange={handleChange} />
            <label htmlFor="">Phone</label>

            <input
              type="tel"
              name="phone"
              className={phoneMatch ? "input-error" : ""}
              defaultValue={user?.phone}
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
              defaultValue={user?.address}
              onChange={handleChange}
            ></textarea>
            <div className="btn">
              <button onClick={handleSubmit}  type="button">
                Edite
              </button>
              
            </div>
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
              Oops! It looks like there was an issue edting your user ifromation. Please double-check your information and try again. If the problem persists, feel free to reach out to our support team for assistance. We're here to help!"
            </motion.h5>}
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default Basics;
