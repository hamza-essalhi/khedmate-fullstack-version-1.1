import Select from "../components/Select";
import { useEffect, useRef, useState } from "react";
import cities from "../../data/cities.json";
import domain from "../../data/dmains.json";
import education from "../../data/education.json";
import Job from "../components/Home/Job";
import Pagination from "../components/Home/Pagination";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { motion, useAnimation, useInView } from "framer-motion";

//rer api 

import api from '../../toolkit/auth/config'
import { useDispatch, useSelector } from "react-redux";
import { clearRequest, clearRequestWithDelay, errorRequests, startRequest } from "../../toolkit/request/requestActions";
import LoadingBox from "../components/LoadingBox";
import Message from "../components/Message";


const Home = () => {
  document.title = 'Home';
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const { isLoading, errorRequest } = useSelector((state) => state.request);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLenght, setSearchLenght] = useState(0);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCities, setSelectedCities] = useState("");
  const [selectedDomains, setSelectedDomains] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);
  const [window731,setWindow731]=useState(false)
  const ref = useRef(null);
  const target = useInView(ref, { once: true });
  const animate = useAnimation();




  const transition = {
    duration: 0.5,
    delay: 0.1,
  };
  useEffect(() => {
    if (target) {
      animate.start("end");
    }
  }, [target, animate]);


  const handleSelectChangeCities = (value) => {
    if (value === 'All') {
      value = ''
    }
    setSelectedCities(value);
  };

  const handleSelectChangeDomain = (value) => {
    if (value === 'All') {
      value = ''
    }
    setSelectedDomains(value);

  };
  const handleSelectChangeEducation = (value) => {
    if (value === 'All') {
      value = ''
    }
    setSelectedEducation(value);

  };

  // scroll button



  // console.log(data)

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.body.scrollHeight;
      setShowTopButton(!isBottom);
      const isTop = window.scrollY === 0;
      setShowBottomButton(!isTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  // fetch data
  useEffect(() => {
    const fetchFilteredJobs = async () => {
      dispatch(clearRequest())
      dispatch(startRequest());

      try {
        const params = {
          search: searchQuery,
          city: selectedCities,
          domain: selectedDomains,
          education: selectedEducation,
          time: selectedTime
        }

        const response = await api.get("jobs", { params });
        const filteredJobs = response.data.jobs
        setFilteredJobs(filteredJobs);
        dispatch(clearRequestWithDelay())
      } catch (error) {
        dispatch(errorRequests())
      }
    };

    fetchFilteredJobs();
  }, [selectedCities, selectedDomains, selectedEducation, selectedTime, searchQuery, dispatch]);


  // merge jobs and users,when we use api we need relationship in db cascade users and jobs

  const mergedData = filteredJobs

  // Pagination load 10 rows in one page stile needs some fixing
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = mergedData.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // change page and data
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  // search in whit title and discriptioin


  const options = [
    { label: "New", value: "New" },
    { label: "Old", value: "Old" },
  ];

  const handleSelectChangeTime = (value) => {
    setSelectedTime(value);
  };



  // if search query not empty push filteredJobs else push currentJobs

  const displayJobs = searchQuery ? filteredJobs : currentJobs;

  // handling the job search lenght

  useEffect(() => {
    setSearchLenght(displayJobs.length);
  }, [displayJobs.length]);



  useEffect(()=>{
    window.addEventListener("scroll", function() {
      var scrollableDiv = document.getElementById("scrollableDiv");
      var specificHeight = 300; // Adjust this value to your specific height
  
      // Calculate the bottom position of the div
      var divBottom = scrollableDiv?.offsetTop + scrollableDiv?.clientHeight;
  
      if (window.scrollY >= specificHeight && window.scrollY < divBottom) {
        if(window.scrollY>731){
          setWindow731(true)
        }
        else {
          setWindow731(false)
        }
          
      }
  });
  })




  return (
    <div className="home container">
<Message messages={messages} />
      <div className="scroll-bottom">
        <button
          onClick={scrollToBottom}
          style={{ display: showTopButton ? "block" : "none" }}
        >
          <IoIosArrowDropdownCircle className="scroll-icon"></IoIosArrowDropdownCircle>
        </button>
      </div>
      <motion.div
      className={window731 ? 'left window731-left':'left window731-left-show'}
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
        <h1>Filter</h1>
        <div className="row">
          <div className="sub-row">
            <div className="col selected-sort date" >
              <h4>Sort by old or new</h4>
              <Select
                options={options}
                op="Select"
                onChange={handleSelectChangeTime}
              />
            </div>
            <div className="col">
              <h4>Cities</h4>
              <Select
                options={cities}
                op="Select"
                onChange={handleSelectChangeCities}
              />
            </div>
            <div className="col">
              <h4>Domain</h4>
              <Select
                options={domain}
                op="Select"
                onChange={handleSelectChangeDomain}
              />
            </div>

            <div className="col">
              <h4>Educations</h4>
              <Select
                options={education}
                op="Select"
                onChange={handleSelectChangeEducation}
              />
            </div>
            <div className="col sub-row search-box">
              <div className="form">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
      id="scrollableDiv"
        className={window731 ? 'right window731-right':'right window731-right-show'}
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
        <div className="row search-row">
          <div className="col search">
            <h1>Search</h1>
          </div>
          <div className="col search-box">
            <div className="form">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

            </div>
          </div>
          <div className="col job-result">
            {searchQuery === "" ? (
              <h4>Search For Job</h4>
            ) : (
              <h4>{searchLenght} jobs has been found</h4>
            )}
          </div>
        </div>
        {isLoading ? <LoadingBox /> : errorRequest ? 'Error' : currentJobs?.map((job, i) => {
          return <Job key={i} job={job} />;
        })}

        <div className="row pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleClick={handleClick}
          />
        </div>

      </motion.div>
      <div
        className="scroll-top"
        style={{ display: showBottomButton ? "block" : "none" }}
      >
        <button onClick={scrollToTop}>
          <IoIosArrowDropupCircle className="scroll-icon"></IoIosArrowDropupCircle>
        </button>
      </div>

    </div>
  );
};

export default Home;
