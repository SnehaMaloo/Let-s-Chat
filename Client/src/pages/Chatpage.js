import { ChatState } from "../Context/ChatProvider"
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

const ChatPage = () => {
  const {user}=ChatState();
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <div className="container d-flex justify-content-between">
          {user&&<MyChats/>}
          {user&&<ChatBox/>}
      </div>
    </div>
  )
}

export default ChatPage
