import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
    <div className="container notFound text-center">
        <section>
            <div className="row">
                <div className=" d-flex justify-content-center align-content-center">
                    <div>
                    <p className='haha'><span style={{ color: 'rgba(252,176,66,255)' }}>Not Found Sandy</span>  Please Go Back!</p> 
                    </div>
                </div> 
                    
                <div className="d-flex justify-content-center">
                    <div>
                        <Link to='/home'><button className='btn btn-warning'>Go back</button></Link>
                    </div>
                </div>
            </div>
        </section>
    </div>
    
    </>
  )
}

export default NotFound