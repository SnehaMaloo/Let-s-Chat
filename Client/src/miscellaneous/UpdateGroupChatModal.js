import React,{useState} from 'react'
import { toast } from 'react-toastify';
import { ChatState } from '../Context/ChatProvider';
import * as bootstrap from 'bootstrap';
import UserBadgeItem from '../components/UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../components/UserAvatar/UserListItem';
import Spinner from './Spinner';

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain,fetchMessages}) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState("false");
  const {selectedChat, setSelectedChat, user} = ChatState();
  const [Modalnum,setModalnum]=useState('');

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast.error('User Already Added!', {
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

    if (selectedChat.groupAdmin._id !== user._id) {
      toast.error('Only Admins can add someone!', {
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

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error('Error Ocurred', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setLoading(false);
    }
    setGroupChatName("");
  };


  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error('Error Ocurred', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error('Error Ocurred', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.error('Only Admins can remove someone!', {
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

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
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
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <button className="bg-white border-0 fontfam" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" data-bs-backdrop="static" onClick={()=>setModalnum(2)}>
      <i className='fas fa-eye'></i>
      </button>

      <div className="modal fade" id={`staticBackdrop${Modalnum}`} data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
          <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{selectedChat.chatName}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div>
                      {selectedChat.users.map((u,index)=>
                      (
                        u._id!==user._id?
                          <UserBadgeItem key={index} user={u}  admin={selectedChat.groupAdmin} handleFunction={() => handleRemove(u)} />:<div key={index}></div>))}
                    </div>
                    <form className='d-flex flex-row align-items-center'>
                        <div className="mb-3 col-9">
                            <label htmlFor="ChatName" className="form-label">Chat Name</label>
                            <input className="form-control" placeholder='Chat Name' value={groupChatName} onChange={(e)=> setGroupChatName(e.target.value)}/>
                        </div>
                        <button className='mt-3 mx-1 btn btn-success col-3' isloading={renameLoading} onClick={handleRename}>Update</button>
                    </form>
                    <form className='d-flex flex-column mb-2'>
                            <label htmlFor="SearchUser" className="form-label">Search Users</label>
                            <input className="form-control" placeholder='Add Users eg:John, Piyush, Jane' onChange={(e)=> handleSearch(e.target.value)}/>
                    </form>
                    <div>
                    {loading ? <Spinner/>:(searchResult?.slice(0,4).map((u,index) =><UserListItem key={index} user={u} handleFunction={()=>handleAddUser(u)}/>))}
                        </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleRemove(user)} >Leave Group</button>
                  </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateGroupChatModal;
