import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import  {getSender,getSenderFull} from '../../config/ChatLogics' 
import ProfileModal from './ProfileModal';

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat}=ChatState();
    
    return (
    <>
    {selectedChat?(<>
        <div className='text-size-28 text-size-md-30 pb-3 px-2 w-100 fontfam d-flex justify-content-center justify-content-sm-between align-items-center'>
            <i className='d-none d-sm-block d-md-none fas fa-arrow-left' onClick={()=>setSelectedChat("")}></i>
            {!selectedChat.isGroup?
            (<><p className='fs-4 fw-bold text-body-secondary'>{getSender(user,selectedChat.users).toUpperCase()}</p>
            {<ProfileModal u={getSenderFull(user,selectedChat.users)} val={"false"}/>}
            </>):
            (<>{selectedChat.chatName.toUpperCase()}
                {/* <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/> */}
            </>)}
        </div>
        <div className='d-flex flex-column justify-content-end p-3 w-100 h-100 border rounded-3 overflow-y-hidden' style={{background:"#E8E8E8"}}>

    </div>
    </>):
    (<div className='d-flex align-items-center justify-content-center h-100'>
        <p className='fs-1 pb-3 fontfam text-body-tertiary'>
            Click on a user to start chatting
        </p>
    </div>)}
    </>
  )
}

export default SingleChat
