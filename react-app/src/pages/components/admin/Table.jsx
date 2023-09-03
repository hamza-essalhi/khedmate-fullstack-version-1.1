import React, { useState } from 'react';
import TabelRow from './TabelRow';
import Pagination from '../Home/Pagination';

export const Table = ({ data }) => {
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
        <h1>No Job Applications available.</h1>
      </div>
    );
  }

  return (
    <div className="table">
      <h1>Applications</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>date</th>
            <th>status</th>
            <th>action</th>
            
          </tr>
        </thead>
        <tbody>
          {currentJobs?.map((job, i) => (
            <TabelRow key={i} job={job} />
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
