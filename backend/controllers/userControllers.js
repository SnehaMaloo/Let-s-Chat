const asyncHandler=require("express-async-handler");
const User=require('../models/User');
const generateToken=require('../config/generateToken');
const Chat = require("../models/Chat");


const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password,pic}=req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Pleasr Enter all the fields");
    }

    const userExist=await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exists");
    }
    else
    {
        const user=await User.create({
            name,
            email,
            password,
            pic
        });
        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                pic:user.pic,
                token:generateToken(user._id),

            })
        }
        else
        {
            res.status(400);
            throw new Error("Failed to create new User");
        }
    }

});

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({ email});
    const val=await user.matchPassword(password);
    if(user && val){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }else
    {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
})

const allUser=asyncHandler(async(req,res)=>{
    const keyword=req.query.search?
    {
        $or:
        [
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    }
        :{};
        const users=await User.find(keyword).find({_id:{$ne:req.user._id}});  //this says that all users with particular keywords can be shown except the user itself but to get data of current user we need jwt middleware
        res.send(users);
});

module.exports= {registerUser,authUser,allUser};











//express async handler