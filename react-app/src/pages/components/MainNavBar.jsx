import { Link, useNavigate } from "react-router-dom";

//images
import bannerImage from "../../images/banner.png";
import userImage from "../../images/user.jpg";

//Icons
import { AiFillMessage, AiOutlineLogin } from "react-icons/ai";
import {
  IoMdNotifications,
  IoMdSearch,
  IoMdMenu,
  IoMdSettings,
  IoMdLogOut,
  IoMdPersonAdd,
} from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
//utls
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { logoutAsync } from "../../toolkit/auth/authSlice";


const MainNavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const ref = useRef(null);
  const target = useInView(ref, { once: true });
  const animate = useAnimation();
  const dispatch=useDispatch()
  const navigate=useNavigate()



  
  const transition = {
    duration: 0.5,
    delay: 0.1,
  };
  useEffect(() => {
    if (target) {
      animate.start("end");
    }
  }, [target,animate]);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 700) {
        setMenuOpen(false);
        setUserMenuOpen(false)
      }
      
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const logoutFunc=()=>{
    dispatch(logoutAsync())
    navigate('/login')
  }

  document.addEventListener('click', (event) => {
    const userButton = document.querySelector('#user-button');
    const navButton = document.querySelector('#nav-button')
    const isClickedUserButton = userButton.contains(event.target);
    const isClickedNavButton = navButton.contains(event.target);
  
    if (!isClickedUserButton ) {
      setUserMenuOpen(false);
    }
    if (!isClickedNavButton) {
      setMenuOpen(false);
    }
  });
  const menuHandler = () => setMenuOpen(!menuOpen);
  const userMenuHandler = () => setUserMenuOpen((userMenuOpen) => !userMenuOpen);
  return (
    <motion.nav className={menuOpen ? "main-nav-active" : "main-nav-bar"}
    ref={ref}
      variants={{
        start: {
          opacity: 0,
          scale: 0.8,
          x: -100,
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
      <div className="banner">
        <Link to="/" className="text-banner">
          <IoMdSearch className="search-icon"></IoMdSearch>
          <span>K</span>
        </Link>

        <Link to="/">
          <img src={bannerImage} alt="" />
        </Link>
      </div>
      <div className="left">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated&& (<li>
            <Link to={`/user/${user.user._id}`}>Profile</Link>
          </li>)}
          <li>
            <Link to='about-us'>About Us</Link>
          </li>
          <li>
            <Link to='contact-us'>Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="right">
        <ul>
          <li>
            <Link to="/chat">
              <AiFillMessage></AiFillMessage>
            </Link>
          </li>
          <li>
            <Link to="/">
              <IoMdNotifications></IoMdNotifications>
            </Link>
          </li>
          {isAuthenticated ?<li className="user-side">
            <img src={userImage} onClick={userMenuHandler} alt="" id="user-button" />
          </li>
          :
          <li className="user-side" onClick={userMenuHandler}>
            <span>
            <FaUserAlt   id="user-button"></FaUserAlt>
            </span>
          
          </li>}
        </ul>
      </div>
      {
        isAuthenticated? (
          <div className={userMenuOpen ? "user-menu-active" : "user-menu"} >
        <Link to={`/user/${user.user._id}`}>
          <FaUserAlt className="user-menu-icon"></FaUserAlt>
          Profile
        </Link>
        <Link to="/">
          <IoMdSettings className="user-menu-icon"></IoMdSettings>
          Settings
        </Link>
        <Link to="/" onClick={logoutFunc}>
          <IoMdLogOut className="user-menu-icon" ></IoMdLogOut>
          Logout
        </Link>
      </div>
        ):(
          <div className={userMenuOpen ? "user-menu-active login-menu" : "user-menu"} >
        <Link to="/login">
          <AiOutlineLogin className="user-menu-icon"></AiOutlineLogin>
         login
        </Link>
        <Link to="/sign-up">
          <IoMdPersonAdd className="user-menu-icon"></IoMdPersonAdd>
          Sign Up
        </Link>
       
      </div>
        )
      }
      <div className="menu">
        <button className="btn-menu" onClick={menuHandler} id="nav-button">
          {" "}
          <IoMdMenu></IoMdMenu>
        </button>
      </div>
    </motion.nav>
  );
};

export default MainNavBar;
