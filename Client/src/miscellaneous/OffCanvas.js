import * as bootstrap from 'bootstrap';
import {useState } from "react";
import { ChatState } from '../Context/ChatProvider';
import {toast } from 'react-toastify';
import axios from "axios";
import UserListItem from '../components/UserAvatar/UserListItem';
import Spinner from "./Spinner";

const OffCanvas = () => {
  const [search, setSearch] = useState("");
  const [data,setSearchdata]=useState("Search User");
  const [loading,setLoading]=useState(false);
  const [loadingChat,setLoadingChat]=useState(false);
  const {user,setSelectedChat,chats,setChats}=ChatState();
  const [searchResult,setSearchResult]=useState([]);
  const handleSearch = async () => {
    if(!search){
        toast.warn('Please Enter Something in search', {
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
    try{
        setLoading(true);
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`,
            },
        };
        const {data}=await axios.get(`/api/user?search=${search}`,config);
        setLoading(false);
        setSearchResult(data);
        setSearchdata("OOps !! No User Found")
    }catch(error){
        toast.error('Failed to load Search Result', {
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

  };
  const accessChat=async (userId)=>{
    setLoadingChat(true);
    try{
        const config={
          headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${user.token}`,
          },
      };

      const {data}=await axios.post('/api/chat',{userId},config);
      if(!chats.find((c)=>c._id===data._id))
      {
        setChats([data,...chats]);
      }
      
      setLoadingChat(false);
      setSelectedChat(data);
    }catch(error){
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
  return (
    <>
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="static" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Search User</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"/>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex pb-2">
            <input className="form-control me-2" type="search" placeholder="Search by name or email" aria-label="Search"  value={search} onChange={(e) => { setSearch(e.target.value) }}/>
            <button className="btn btn-outline-success" onClick={handleSearch}>Go</button>
          </div>
          {loading ? (
            <Spinner/>
          ) : searchResult.length === 0 ? (
            <p className="text-center fw-bolder">{data}</p>
          ) : (
            searchResult.map((nuser) => (
              <UserListItem
                key={nuser._id}
                user={nuser}
                handleFunction={() => accessChat(nuser._id)}
              />
            ))
          )}
          {loadingChat && <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>}
        </div>
      </div>
    </>
  );
}

export default OffCanvas;
