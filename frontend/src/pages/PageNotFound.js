import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <>
    <div className="pnf">
      <h1 className='pnf-title'>404!</h1>
      <h2 className='pnf-heading'>OOPs.. Page Not Found</h2>
      <Link to='/' className='pnf-btn mt-3'>Go Back</Link>
    </div>
    </>
  )
}

export default PageNotFound