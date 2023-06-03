const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?w=860&ssl=1"
    }

},{timestamps:true});

userSchema.methods.matchPassword = async function (enteredPassword) {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
      } catch (error) {
        throw new Error('Password comparison error');
      }
};  
//we cant store he password in plain form so we need to encrypt
userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);

})   //before saving 

const User=mongoose.model('User',userSchema);
module.exports=User;