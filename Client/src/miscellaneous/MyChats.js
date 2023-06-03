import * as bootstrap from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import {toast } from 'react-toastify';
import axios from "axios";
import { getSender } from '../config/ChatLogics';
import GroupChatModal from './GroupChatModal';

const MyChats = ({fetchAgain}) => {
  const [loggedUser,setLoggedUser]=useState();
  const {selectedChat,setSelectedChat,user,chats,setChats}=ChatState();
  const [color,setColor]=useState("black");
  const [selected,setSelected]=useState("#E8E8E8");

  const fetchChats = async () =>{
    try{
      const config={
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user.token}`,
        },
    };
    const {data}=await axios.get('/api/chat',config);
    setChats(data);
    }
    catch(error){
      toast.error('Error Fetching the chat', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
  
  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  },[fetchAgain]);

  return (
    <>
      <div className={`${selectedChat ? "d-none" : "d-flex"} d-md-flex flex-column align-items-center p-3 bg-white w-100 border rounded-1 h-100 mx-2`}>
        <div className='pb-3 px-3 fw-bold text-body-secondary d-flex justify-content-between align-items-center w-100 fontfam fs-4'>MyChats<GroupChatModal><button className='d-flex fs-17 border rounded-1 buttonclass'><p className='d-sm-none d-lg-flex my-1'>New Group Chat</p><i className="fas fa-plus mx-2 my-2"></i></button></GroupChatModal></div>
        <div className='d-flex-column p-3 w-100 h-100 rounded-1 overflow-y-hidden' style={{background:"#F8F8F8"}}>
        {chats ? (
          <div className='overflow-y-scroll'>
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  setSelectedChat(chat);
                  setColor("black");
                  setSelected("#38B2AC");
                }}
                className="cursor-pointer rounded-1"
                style={{ background: `${selected}`, color: `${color}` }}
              >
                {!chat.isGroup ? (
                  <p className='fs-4 fw-bold user-list-item px-3'>{getSender(loggedUser, chat.users)}</p>
                ) : (
                  <p className='fs-4 fw-bold user-list-item px-3'>{chat.chatName}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  )
}

export default MyChats
