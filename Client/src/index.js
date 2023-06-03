import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import ChatProvider from './Context/ChatProvider';
import 'font-awesome/css/font-awesome.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <ChatProvider>
      <App />
      </ChatProvider>
    </BrowserRouter>
);
