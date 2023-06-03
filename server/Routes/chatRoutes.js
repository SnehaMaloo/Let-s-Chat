const express=require('express');
const router=express.Router();
const { protect } = require("../middlewares/authmiddleware");
const {accessChat,fetchChats,createGroupChat,renameGroupChat,removeFromGroup,addToGroup}=require("../controllers/chatControllers")

router.post('/',protect,accessChat);

router.get('/',protect,fetchChats);  //to fetch all the chats related to that user

router.post('/group',protect,createGroupChat);

router.route('/rename').put(protect,renameGroupChat);

router.route("/groupremove").put(protect,removeFromGroup);

router.route("/groupadd").put(protect,addToGroup);

module.exports=router;