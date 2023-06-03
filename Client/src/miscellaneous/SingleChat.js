import * as bootstrap from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import  {getSender,getSenderFull} from '../config/ChatLogics' 
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import Spinner from './Spinner';
import axios from 'axios';
import {toast} from 'react-toastify';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

const ENDPOINT="http://localhost:5000";
var socket ,selectedChatCompare;

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const [messages,setMessages]=useState([]);
    const [loading,setLoading]=useState(true);
    const [newMessage,setNewMessage]=useState('');
    const {user,selectedChat,setSelectedChat,notification,setNotifications}=ChatState();
    const [socketConnected,setsocketConnected]=useState(false);
    const [typing,setTyping]=useState(false);
    const [istyping,setisTyping]=useState(false);


    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit('setup',user);
        socket.on('connected',()=>setsocketConnected(true))
        socket.on('typing',()=>setisTyping(true));
        socket.on('stop typing',()=>setisTyping(false));
    })

    useEffect(()=>{
        fetchMessages();
        selectedChatCompare=selectedChat;
    },[selectedChat]);

    useEffect(()=>{
        socket.on('message Received',(newMessageReceived)=>{
            if(!selectedChatCompare || selectedChatCompare._id!==newMessageReceived.chat._id)
            {
                if(!notification.includes(newMessageReceived)){
                    setNotifications([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                    console.log(notification);
                }
            }
            else{
                setMessages([...messages,newMessageReceived]);
            }
        });
    });


    const fetchMessages=async ()=>{
        if(!selectedChat) return;
        try{
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            }
            setLoading(true);
            const {data}=await axios.get(`/api/message/${selectedChat._id}`,config);
            setMessages(data);
            setLoading(false);

            socket.emit('join chat',selectedChat._id);
        }catch(error){
            toast.error('Error Ocurred!', {
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

    const sendMessage=async (e)=>{
        e.preventDefault();
        if(newMessage)
        {
            socket.emit('stop typing',selectedChat._id)
            try{
                const config={
                    headers:{
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    }
                };
                setNewMessage("");
                const {data}=await axios.post('/api/message',{
                    content:newMessage,
                    chatId:selectedChat._id,
                },config);
                socket.emit('new message',data);
                setMessages([...messages,data]);
            }
            catch(error){
                toast.error('Error Ocurred!', {
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
    };
    const typingHandler=(e)=>{
        setNewMessage(e.target.value);

        if(!socketConnected)return;

        if(!typing){
            setTyping(true);
            socket.emit('typing',selectedChat._id);
        }
        let lastTypingTime=new Date().getTime();
        var timerLength=3000;
        setTimeout(()=>{
            var timeNow=new Date().getTime();
            var timeDiff=timeNow-lastTypingTime;
            if(timeDiff>=timerLength && typing)
            {
                socket.emit('stop typing',selectedChat._id)
                setTyping(false);
            }
        },timerLength)
    };

    return (
    <>
    {selectedChat?(<>
        <div className='text-size-28 text-size-md-30 pb-3 px-2 w-100 fontfam d-flex justify-content-center justify-content-sm-between align-items-center'>
            <i className='d-none d-sm-block d-md-none fas fa-arrow-left' onClick={()=>setSelectedChat("")}></i>
            {!selectedChat.isGroup?
            (<><p className='fs-4 fw-bold text-body-secondary'>{getSender(user,selectedChat.users).toUpperCase()}</p>
            {<ProfileModal user={getSenderFull(user,selectedChat.users)} val={false}></ProfileModal>}
            </>):
            (<><p className='fs-4 fw-bold text-body-secondary'>{selectedChat.chatName.toUpperCase()}</p>
                {<UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}/>}
            </>)}
        </div>
        <div className='d-flex flex-column p-3 w-100 h-100 border rounded-3 overflow-y-hidden justify-content-center' style={{background:"#E8E8E8"}}>
                {loading?(<Spinner/>):(<>
                    <div className='messages'><ScrollableChat messages={messages}/></div>
                </>)}
                {istyping?<div>Loading...</div>:<></>}
                </div>  
                <form className='form-control mt-3 d-flex flex-row'>
                     <input className='form-control mx-1' style={{background:"#E0E0E0",width:'90%'}} placeholder='Enter a message...' onChange={typingHandler} value={newMessage}/>
                    <button className='btn btn-primary' style={{width:"10%"}} onClick={sendMessage}><i className="fas fa-send"></i></button>
                </form>
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
