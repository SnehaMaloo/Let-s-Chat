import * as bootstrap from 'bootstrap';
import React from 'react'
import { ChatState } from '../Context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const {selectedChat}=ChatState();
  return (
    <div className={`${selectedChat ? "d-flex" : "d-none"} overflow-y-hidden d-md-flex flex-column align-items-center p-3 bg-white border rounded-1 h-100`}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </div>
  )
}

export default ChatBox
