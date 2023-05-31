import './App.css';
import { Route } from 'react-router-dom';
import HomePage from "./pages/Homepage";
import ChatPage from "./pages/Chatpage";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/chats" component={ChatPage}/>
    </div>
  );
}

export default App;
