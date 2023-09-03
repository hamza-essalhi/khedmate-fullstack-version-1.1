import React from 'react'

function LoadingBox() {
    return (
        <div>
  {Array(4).fill().map((_, i) => (
    <div key={i} className='loading-box row job-box'>
      <div className='top'>
        <div></div>
      </div>
      <div className='bottom'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ))}
</div>


    )
}

export default LoadingBox