import React, { useEffect, useState } from 'react'
import { FaShare, FaTrash } from 'react-icons/fa'
import api from '../../../toolkit/auth/config';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function TabelRow({ jobApplication,onDelete }) {
  const [job, setJob] = useState('')
  const [formattedDate, setFormattedDate] = useState('');
  const user = useSelector((state) => state.auth.user?.user);
  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        const response = await api.get(`jobs/${jobApplication.jobId}`);
        const job = response.data.job
        setJob(job);

      } catch (error) {
      }
    };

    fetchFilteredJobs();

  }, [jobApplication]);

  useEffect(() => {
    const timestampStr = jobApplication?.createdAt;

    const timestamp = new Date(timestampStr);
    const formattedDate = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')} ${String(timestamp.getHours()).padStart(2, '0')}:${String(timestamp.getMinutes()).padStart(2, '0')}:${String(timestamp.getSeconds()).padStart(2, '0')}`;
    setFormattedDate(formattedDate);
  }, [jobApplication?.createdAt]);
  const handleDelete = async () => {
    try {
      await onDelete(jobApplication?._id); // Call the parent's onDelete function
    } catch (error) {
      
    }
  };
  return (
    <tr>
      <td>{jobApplication?._id.slice(6, 9)}</td>
      <td>{job.title}</td>
      <td>{formattedDate}</td>
      <td className='status'>
      <span className={
                            jobApplication.applicationStatus === "accepted"
                                ? "accepted"
                                : jobApplication.applicationStatus === "rejected"
                                    ? "rejected"
                                    : ""
                        }>{jobApplication?.applicationStatus}</span>
      </td>
      <td >{!user.research &&<FaTrash onClick={handleDelete} className='delete-icon'></FaTrash>}
      <Link to={`/applications/${jobApplication._id}`}><FaShare className='delete-icon'></FaShare></Link>
      </td>
    </tr>
  )
}
