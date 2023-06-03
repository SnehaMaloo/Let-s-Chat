import { ChatState } from "../Context/ChatProvider"
import SideDrawer from "../miscellaneous/SideDrawer";
import MyChats from "../miscellaneous/MyChats";
import ChatBox from "../miscellaneous/ChatBox";
import { useState } from "react";

const ChatPage = () => {
  const {user}=ChatState();
  const [fetchAgain,setFetchAgain]=useState(false);
  return (
    <div style={{width:'100vw',height:'100vh'}}>
      {user && <SideDrawer/>}
      <div className="d-flex justify-content-between mx-3" style={{height:'80%' ,width: '97%'}}>
          <div className="col-4 h-100">{user&&<MyChats fetchAgain={fetchAgain} />}</div>
          <div className="col-8 h-100 mr-1">{user&&<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}</div>
      </div>
    </div>
  )
}

export default ChatPage;