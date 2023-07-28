import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

import '../pages/profile.css'
import FeedLeftNavbar from './pageComponents/FeedLeftNavbar';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [loggedin,setLoggedIn] = useState(false);
    const [details,setDetails] = useState([]);
    const navigation = useNavigate();
    const getUser = async () => {
        const res = await axios.get("http://localhost:8080/user",{"withCredentials":true});
        setDetails(res.data);
        console.log(res.data.follows);
    }
    const userLoggedIn = async () => {
      const res = await axios.get("http://localhost:8080/user/islogged",{"withCredentials":true});
      if (res.data["stats"]) {
        setLoggedIn(true);
        getUser();
      } else {
        navigation("/signin?next=profile");
      }
    }
    useEffect(() => {
        userLoggedIn();
    },[]);
  const [follow,setFollow] = useState(false);
  function handleClick() {
    setFollow(!follow);
  }
  return (
    <div className='mainContainer'>
        <FeedLeftNavbar />
        <div className="profileMiddleContainer">
            <div className='userDetailsContainer'>
                <div className="leftblock">
                    <div className="profilePic">
                        <img src={`http://localhost:8080/public/images/${details.profile}`} alt="" className="imgContainer" />
                        @{details.username}
                        <button className="followBtn" onClick={handleClick} style={follow ? {backgroundColor:'black',border:'2px Solid rgb(40,40,40)'}:{}}>
                            {follow ? `Following` : `Follow`} 
                        </button>
                    </div>
                </div>
                <div className="rightblock">
                    <div className='stats'>
                        <div className="statsContents">
                            <div className="statsHeading"> Followers </div>
                            <div className="statsCount"> 3.1K</div>
                        </div>
                        <div className="statsContents">
                            <div className="statsHeading"> Following </div>
                            <div className="statsCount"> 13K</div>
                        </div>
                        <div className="statsContents">
                            <div className="statsHeading"> Threads </div>
                            <div className="statsCount"> 56 </div>
                        </div>
                    </div>
                    <div className="userBio">{details.bio}</div>
                </div>
            </div>

            <div className="userThreadsContainer">
                {details.bio}
            </div>
        </div>
    </div>
  )
}

export default Profile