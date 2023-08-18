import React from 'react'
import { FaTrash } from 'react-icons/fa'

export default function TabelRow({job}) {

    const handelDelet=()=>{
        console.log(job.id)
    }
  return (
    <tr>
        <td>{job.id}</td>
        <td>{job.jobe_title}</td>
        <td>{job.date}</td>
        <td>{job.city}</td>
        <td><FaTrash onClick={handelDelet} className='delete-icon'></FaTrash></td>
    </tr>
  )
}
