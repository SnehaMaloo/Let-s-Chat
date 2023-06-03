const express=require('express');
const router=express.Router();
const {registerUser,authUser,allUser}=require('../controllers/userControllers');
const { protect } = require("../middlewares/authmiddleware");


router.post('/',registerUser);
router.get('/',protect,allUser);
router.post('/login',authUser);


module.exports=router;