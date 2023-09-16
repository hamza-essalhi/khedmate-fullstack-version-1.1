import React, { useState } from 'react';
import Pagination from '../Home/Pagination';
import JobsTabelRow from './JobsTabelRow';
import cities from "../../../data/cities.json";
import domain from "../../../data/dmains.json";
import education from "../../../data/education.json";

import Select from '../Select';
export const ReaserchJobsTable  = ({ data ,onDelete,selectChangeCities,selectChangeDomain,selectChangeEducation,selectChangeSearch,paramsError}) => {

  const [currentPage, setCurrentPage] = useState(1);
const jobsPerPage=10
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = data.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(data.length / jobsPerPage);
  
 

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
   const handleSelectChangeCities = (value) => {
    if (value === 'All') {
      value = ''
    }
    selectChangeCities(value)
  };

  const handleSelectChangeDomain = (value) => {
    if (value === 'All') {
      value = ''
    }
    selectChangeDomain(value)

  };
  const handleSelectChangeEducation = (value) => {
    if (value === 'All') {
      value = ''
    }
    selectChangeEducation(value)

  };
  const handleSelectChangeSearch = (e) => {
    const value = e.target.value;
    selectChangeSearch(value)

  };
  if (!Array.isArray(data)) {
    return (
      <div className="table">
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="table">
      <h1>Posted Jobs</h1>
      <div className="row">
          <div className="sub-row">
            
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
            
          </div>
          <div className="sub-row search-box">
              <div className="form col">
                <h4>Search</h4>
                <input
                  type="text"
                  placeholder="Search..."
                 
                  onChange={handleSelectChangeSearch}
                />
              </div>
            </div>
        </div>
      {!paramsError ? <><table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>date</th>
            <th>domain</th>
            <th>city</th>
            <th>action</th>
            
          </tr>
        </thead>
        <tbody>
          {currentJobs?.map((job, i) => (
            <JobsTabelRow key={i} job={job} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
      <div className='pagination'>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleClick={handleClick}
      />
      </div></>:<div className='params-error'><p >No data available.</p></div>}
    </div>
  );
};
