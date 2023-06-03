import {useHistory} from 'react-router-dom';
import userIcon from './userIcon.png';
import { ChatState } from '../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import OffCanvas from './OffCanvas';
import { getSender } from '../config/ChatLogics';
import * as bootstrap from 'bootstrap';


const SideDrawer = () => {
  const {user,notification,setNotifications,setSelectedChat}=ChatState();
  const history=useHistory();
  const logoutHandler=()=>{
    localStorage.removeItem("userInfo");
    history.push("/");
  }
    return (
    <>
        <div className='d-flex justify-content-between bg-white w-100 mb-5 px-5 pt-3 align-content-center'>
            <button className="btn h-50" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasExample">
                <div className='d-flex flex-row'>
                  <i className="fas fa-search fa-lg"></i>
                  <p className='px-1 d-sm-none d-md-block fw-semibold' style={{ fontFamily: 'Arial, sans-serif' }}>Search User</p>
                </div>
            </button>
            {<OffCanvas/>}
            <p className='fs-1 fw-bolder fontfam fontcolor'>Let's Chat</p>
            <div className='d-flex justify-content-center'>
                <div className="dropdown-center py-2">
                    <button className="btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className={`fas fa-bell fa-lg${notification.length?" iconcolor":""}`}></i>
                    </button>
                    <ul className="dropdown-menu">
                    <li className='dropdown-item fw-bold'>
                    {!notification.length && "No New Messages"}
                    </li>
              {notification.map((notif) => (
                <li className='dropdown-item fw-bold'
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotifications(notification.filter((n) => n !== notif));
                  }}
                >
                {console.log(notif)}
                  {notif.chat.isGroup
                    ?  `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </li>
              ))}          
                    </ul>
                </div>
                <div className="dropdown-center">
                  <button className="btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={user?user.pic:userIcon} alt="Avatar" className="rounded-circle img-fluid " style={{height:'40px',width:'40px'}}/>
                  </button>
                  <ul className="dropdown-menu">
                      <li><button type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">My Profile</button></li>
                      <li><button className="dropdown-item" onClick={logoutHandler}>Logout</button></li>
                  </ul>
                  {<ProfileModal val={true} user={user}/>}
                </div>
            </div>
        </div>
    </>
  )
}

export default SideDrawer

