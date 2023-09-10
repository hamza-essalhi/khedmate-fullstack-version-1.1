import React, { useEffect, useState } from 'react'
import { FaShare, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom';

export default function JobsTabelRow({ job,onDelete }) {
 
  const [formattedDate, setFormattedDate] = useState('');



  useEffect(() => {
    const timestampStr = job.createdAt;

    const timestamp = new Date(timestampStr);
    const formattedDate = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')} ${String(timestamp.getHours()).padStart(2, '0')}:${String(timestamp.getMinutes()).padStart(2, '0')}:${String(timestamp.getSeconds()).padStart(2, '0')}`;
    setFormattedDate(formattedDate);
  }, [job.createdAt]);
  const handleDelete = async () => {
    try {
      await onDelete(job._id); // Call the parent's onDelete function
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <tr>
      <td>{job._id.slice(6, 9)}</td>
      <td>{job?.title}</td>
      <td>{formattedDate}</td>
      <td>{job.domain}</td>
      <td>{job.city}</td>
      <td><FaTrash onClick={handleDelete} className='delete-icon'></FaTrash > <Link to={`/job/${job._id}`}><FaShare className='delete-icon'></FaShare></Link></td>
    </tr>
  )
}
