import * as bootstrap from 'bootstrap';
import React, { useState } from 'react'
import {toast } from 'react-toastify';
import { ChatState } from '../Context/ChatProvider';
import axios from "axios";
import Spinner from './Spinner';
import UserListItem from '../components/UserAvatar/UserListItem';
import UserBadgeItem from '../components/UserAvatar/UserBadgeItem';

const GroupChatModal = ({children}) => {
    const [groupChatName,setGroupChatName]=useState();
    const [selectedUser,setSelectedUser]=useState([]);
    const [search,setSearch]=useState("");
    const [searchResult,setsearchResult]=useState();
    const [loading,setloading]=useState();

    const{user,chats,setChats}=ChatState();
    const handleSearch=async (query)=>{
        setSearch(query)
        if(!query){
            return;
        }
        try{
            setloading(true);
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`,
                }
            }
            const {data}=await axios.get(`/api/user?search=${search}`,config);
            setloading(false);
            setsearchResult(data);
        }
        catch(error){

        }
    }
    const handleGroup=async (userToAdd)=>{
        console.log(selectedUser)
        if(selectedUser.includes(userToAdd))
        {
            toast.error('User Already added', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }
        await setSelectedUser([...selectedUser,userToAdd]);
    }
    const handleSubmit=async ()=>{
        if(!groupChatName || !selectedUser){
            toast.warn('Please Fill All the fields', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }
        try{
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const {data} = await axios.post('/api/chat/group',{
                name:groupChatName,
                users:JSON.stringify(selectedUser.map((u)=>u._id))
            },config);
            setChats([data,...chats]);
            toast.success('New Group Chat Created', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }catch(error){

        }
    }

    const handleDelete=(delUser)=>{
        setSelectedUser(selectedUser.filter(sel => sel._id !== delUser._id))
    }

    return (
    <>
        <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            {children}
        </span>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="d-flex justify-content-center fs-35 fontfam" id="staticBackdropLabel">Create Group Chat</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div className="modal-body d-flex-column align-items-center">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="ChatName" className="form-label">Chat Name</label>
                            <input className="form-control" placeholder='Chat Name' onChange={(e)=> setGroupChatName(e.target.value)}/>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="SearchUser" className="form-label">Search Users</label>
                            <input className="form-control" placeholder='Add Users eg:John, Piyush, Jane' onChange={(e)=> handleSearch(e.target.value)}/>
                        </div>
                    </form>
                    {selectedUser.map(u => (
                            <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />
                        ))}
                    
                    {loading ? <Spinner/>:(searchResult?.slice(0,4).map((u) =><UserListItem key={u._id} user={u} handleFunction={()=>handleGroup(u)}/>))}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Create Chat</button>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default GroupChatModal
