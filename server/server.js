const express=require('express');
const app=express();
const dotenv=require("dotenv");
dotenv.config();
const mongoose=require("mongoose");
const userRoutes=require('./Routes/userRoutes');
const chatRoutes=require('./Routes/chatRoutes');
const {notFound,errorHandler}=require('./middlewares/errormiddleware');
const messageRoutes=require('./Routes/messageRoutes');
const cors = require('cors');

app.use(cors());


mongoose.connect("mongodb://localhost:27017/ChatApp",{family:4})
try{
    console.log("DB connected");
}
catch(err){
    console.log(err.message);
}


app.get('/',(req,res)=>{
    res.send("API is running");
})

app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

//error handling function
app.use(notFound);
app.use(errorHandler);


const PORT=process.env.PORT || 5000
const server=app.listen(PORT,()=>{
    console.log("Server started on Port 5000");
})

const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    }
});

io.on("connection",(socket)=>{
    console.log("connected to socket.io");

    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    })

    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log("User Joined Room: "+room);
    })
    
    socket.on('typing',(room)=>socket.in(room).emit("typing"));
    
    socket.on('stop typing',(room)=>socket.in(room).emit("stop typing"));


    socket.on('new message',(newMessageReceived)=>{
        var chat=newMessageReceived.chat;

        if(!chat.users) return console.log('chat.users not defined');


        chat.users.forEach(user =>{
            if(user._id===newMessageReceived.sender._id) return;
            socket.in(user._id).emit('message Received',newMessageReceived);
        })
    })

    socket.off("setup",()=>{
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
})



//since we are taking value from the frontend as json
//so we need to tell our server to take accept json data from frontend
