import React from 'react'
import * as bootstrap from 'bootstrap';

const Spinner = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
              <div className="spinner-border text-secondary" role="status"  style={{width:"6rem" ,height:"6rem"}}>
                <span className="sr-only"></span>
              </div>
        </div>
    </>
  )
}

export default Spinner
