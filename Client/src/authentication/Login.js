import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setloading]=useState(false);
    const history=useHistory();
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      const submitHandler = async () => {
        setloading(true);
        if (!email || !password) {
          toast.error('Please Fill all the fields', {
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
          return;
        }
    
        // console.log(email, password);
        try {
          const config={
            headers:{
                "Content-type":"application/json",
            },
        }
        const {data}=await axios.post('/api/user/login',{email,password},config);
          // console.log(JSON.stringify(data));
          toast.success('Login is successfull', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          localStorage.setItem("userInfo", JSON.stringify(data));
          setloading(false);
          history.push("/chats");
        } catch (error) {
          toast.error('Invalid email and password', {
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
      };
  return (
    <>
    <div className="col">
        <div className="row-md-6 mx-4">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-control " placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">password</label>
                        <div className='input-group'>
                        <input className="form-control" type={showPassword ? 'text' : 'password'} value={password} placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                        <button
                        className="btn border border-primary"
                        type="button"
                        onClick={togglePasswordVisibility}
                        >
                        {showPassword ? 'Hide' : 'Show'}
                        </button>
                        </div>
                    </div>
                    {loading? 
                    <div className='mx-5'><div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span></div></div>:
                          <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={submitHandler} >Login</button>}
                    <button type="submit" className="btn btn-danger btn-sm my-2" style={{ width: '100%' }} onClick={()=>{setEmail("guest@gmail.com");
                    setPassword("123456")}} >Get Guest User Credentials</button>
        </div>
    </div>
    </>
  )
}

export default Login;
