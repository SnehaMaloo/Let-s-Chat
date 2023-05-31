import React from 'react'
import userIcon from './userIcon.png';

const ProfileModal = ({u,val}) => {

  return (
    <>
        {val==="true" ? (
        <></>
      ) : (
        <button className='btn' data-bs-toggle="modal" data-bs-target="#exampleModal">View Profile</button>
      )}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                 <div className="modal-body d-flex flex-column">
                        <div style={{background:'linear-gradient(to bottom right, #d607ff, #FF5722)',borderRadius: '50%'}}>
                            <img className="rounded-circle img-fluid my-3" src={u.pic?u.pic:userIcon} alt="Profile pic"></img>
                        </div>
                        <div>
                            <p className='text-center font-monospace fw-bold text-shadow fs-1' style={{textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",fontFamily:'cursive',color:'#611947'}}><i className="far fa-user text-dark mx-3"></i>{u.name}</p>
                        </div>
                        <div>
                            <p className='text-center font-monospace fw-bold text-shadow fs-3' style={{textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",fontFamily:'cursive',color:'#343673'}}><i className="far fa-envelope text-dark mx-3"></i>{u.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfileModal
