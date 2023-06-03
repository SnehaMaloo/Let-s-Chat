import React, { useState } from 'react'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPassword, setShowconfirmPassword] = useState(false);
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [confirmpassword,setConfirmpassword]=useState();
    const [pic,setPic]=useState();
    const [loading,setloading]=useState(false);
    const history=useHistory();

    const postDetails=async (pics)=>{
        setloading(true);
        if(pics===undefined){
            toast.error("Please upload the image", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                return ;
        }
        else if(pics.type==="image/jpeg" || pics.type==="image/png")
        {
            const data=new FormData();
            data.append("file",pics);
            data.append("upload_preset","chatApp");
            data.append("cloud_name","dmxvy0lv9");
            await fetch("https://api.cloudinary.com/v1_1/dmxvy0lv9/image/upload",{
                method:'post',
                body:data,
            }).then((res)=> res.json()).then(data=>{
                setPic(data.url.toString());
                setloading(false);
            }).catch((err)=>{
                setloading(false);
            })
        }
        else{
            toast.error("Please upload the image", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setloading(false);
                return ;
        }

    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    const toggleconfirmPasswordVisibility = () => {
        setShowconfirmPassword(!showconfirmPassword);
    };

    const submitHandler=async ()=>{
        setloading(true);
        if(!name || !email || !password || !confirmpassword)
        {
            toast.error("Please fill all the fields", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setloading(false);
            return;
        }
        if(password!==confirmpassword)
        {
            toast.error("Passwords Do Not Match", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return ;
        }
        try{
            const config={
                headers:{
                    "Content-type":"application/json",
                },
            }
            const {data}=await axios.post("/api/user",{name,email,password,pic},config);
            toast.success('Registered successfully', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            localStorage.setItem('userInfo',JSON.stringify(data));
            setloading(false);
            history.push("/chats");
        }       
        catch(error){
            toast.error('Error Ocurred!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setloading(false);
        }
    }

  return (
    <>
    <div className="col">
        <div className="row-md-6 mx-4">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input className="form-control " placeholder="username" onChange={(e)=>{setName(e.target.value)}} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-control " placeholder="email" onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">password</label>
                        <div className='input-group'>
                        <input className="form-control" type={showPassword ? 'text' : 'password'}  placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                        <button
                        className="btn border border-primary"
                        type="button"
                        onClick={togglePasswordVisibility}
                        >
                        {showPassword ? 'Hide' : 'Show'}
                        </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="confirmpassword">confirm password</label>
                        <div className='input-group'>
                        <input className="form-control" type={showconfirmPassword ? 'text' : 'password'}  placeholder="confirm password" id="confirmpassword" onChange={(e)=>{setConfirmpassword(e.target.value)}} required/>
                        <button
                        className="btn border border-primary"
                        type="button"
                        onClick={toggleconfirmPasswordVisibility}
                        >
                        {showconfirmPassword ? 'Hide' : 'Show'}
                        </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="pic">Upload Your picture</label>
                        <input className="form-control " type="file" accept="image/*" id="email" onChange={(e)=>{postDetails(e.target.files[0])}} required/>
                    </div>
                    {loading? <div className='mx-5'><div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span></div></div>:
                            <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={submitHandler}>
                    SignUp</button>}

        </div>
    </div>
    </>
  )
}

export default SignUp;

