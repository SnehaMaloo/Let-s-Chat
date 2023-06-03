const jwt=require('jsonwebtoken');

const generateToken=(id)=>{
    return jwt.sign({id},'sneha_131',{
        expiresIn:"30d",
    });
}


module.exports=generateToken;

//jwt help to authorize the user in the bckend
//jwt is used for authorization which allows backend to decide whether that particular user is authorize to access that resource or not
