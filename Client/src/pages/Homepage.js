import React, { useEffect } from 'react'
import Login from '../authentication/Login';
import SignUp from '../authentication/SignUp';
import { useHistory } from 'react-router-dom';
const Homepage = () => {
    const history=useHistory();
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("userInfo"));
        if(user) history.push("/chats");
    },[history]);

  return (
    <>
    <div className="container-xl d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '100vh' }}>
            <div className='m-5 rounded-1 bg-white text-center' style={{ width: '40%', height: '10%' }}>
                <h1 className='pt-3 fontfam fontcolor'> Let's Chat</h1>
            </div>
            <div className='p-2 rounded-1 bg-white' style={{ width: '40%'}}>
                <ul className="nav nav-pills mb-3 d-flex justify-content-center" id="pills-tab" role="tablist">
                    <li className="w-50 nav-item" role="presentation">
                        <button className="nav-link active rounded-5 fontcolor" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Login</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link rounded-5 fontcolor " id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">SignUp</button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"><Login/></div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"><SignUp/></div>
                </div>
            </div>
    </div>
    </>
  )
}

export default Homepage


// we have used cloudinary for pictures
//Cloudinary is a cloud-based media management platform that provides a comprehensive solution for storing, optimizing, managing, and delivering images, videos, and other media assets on the internet. It offers a range of features and services designed to simplify the process of handling media files for websites and applications.