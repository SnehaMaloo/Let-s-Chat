import React from 'react'


const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <>
      <div className='d-inline-flex align-items-center px-3 py-1 border rounded-5 m-1 mb-2 fs-12 cursor-pointer overflow-x-hidden' style={{background:"#9e3086",color: "white"}} onClick={handleFunction}>
        {user.name}<i className='m-2 fa fa-times'></i><div/>
      </div>
    </>
  )
}

export default UserBadgeItem
