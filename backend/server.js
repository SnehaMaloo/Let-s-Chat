const express=require('express');
const app=express();
const dotenv=require("dotenv");
dotenv.config();
const mongoose=require("mongoose");
const userRoutes=require('./Routes/userRoutes');
const chatRoutes=require('./Routes/chatRoutes');
const {notFound,errorHandler}=require('./middlewares/errormiddleware');
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

//error handling function
app.use(notFound);
app.use(errorHandler);


const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server started on Port 5000");
})



//since we are taking value from the frontend as json
//so we need to tell our server to take accept json data from frontend
