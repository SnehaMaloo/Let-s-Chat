import * as bootstrap from 'bootstrap';
import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameUser, isSameSender, isSameSenderMargin } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import userIcon from './userIcon.png';

const ScrollableChat = ({messages}) => {
    const {user}=ChatState();
    console.log(messages);
  return (
    <ScrollableFeed>
      {messages && messages.map((m,i)=>(
        <div className='d-flex' key={m._id}>
            { (isSameSender(messages,m,i,user._id) || isLastMessage(messages,i,user._id)) && (<img src={m.sender.pic?m.sender.pic:userIcon} alt="Avatar" className="rounded-circle img-fluid " style={{height:'40px',width:'40px'}}/>)}
            <span style={{background:`${m.sender._id===user._id? "#BEE3F8":"#B9F5D0"}`,borderRadius:"20px",padding:"5px 15px",maxWidth:"75%",marginLeft:isSameSenderMargin(messages,m,i,user._id),marginTop:isSameUser(messages,m,i)}} >
            {(m.sender._id!==user._id && m.chat.isGroup===true)?(m.sender.name+ ": " + m.content):m.content}
            </span>
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
