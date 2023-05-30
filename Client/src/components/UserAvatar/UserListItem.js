import React from 'react'
import { ChatState } from '../../Context/ChatProvider';
import userIcon from '../miscellaneous/userIcon.png';

const UserListItem = ({user,handleFunction}) => 
{
    console.log("Yo");
  return (
    <>
      <div onClick={handleFunction} className='d-flex align-items-center w-100 color-black px-3 py-2 mb-2 rounded-1' style={{background:"#E8E8E8",_hover:{background:"#38B2AC",color:"white"}}}>
      <img src={user?user.pic:userIcon} alt="Avatar" className="rounded-circle img-fluid " style={{height:'60px'}}/>
      <p className='mx-4'>{user.name}</p>
      <p className='mt-3'>
      <b>
        Email:{user.email}
      </b>
      </p>
      </div>
    </>
  )
}

export default UserListItem
