import React, { useState } from 'react';
import Pagination from '../Home/Pagination';
import JobsTabelRow from './JobsTabelRow';

export const ReaserchJobsTable  = ({ data ,onDelete}) => {

  const [currentPage, setCurrentPage] = useState(1);
const jobsPerPage=10
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = data.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(data.length / jobsPerPage);
  
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <table>
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
          {currentJobs.map((job, i) => (
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
      </div>
    </div>
  );
};
