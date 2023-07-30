import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import '../pages/profile.css'
import FeedLeftNavbar from './pageComponents/FeedLeftNavbar';
import { useNavigate } from 'react-router-dom';

function Profile() {
    // Login  
    const userLoggedIn = async () => {
        const res = await axios.get("http://192.168.29.188:8080/user/islogged",{"withCredentials":true});
        if (res.data["stats"]) {
          setLoggedIn(true);
          getUser(null);
          if (paramsData["uname"]) {getUser(paramsData["uname"]);}
        } else {
          if (paramsData["uname"]) {getUser(paramsData["uname"]);}
          else {navigation("/signin?next=profile");}
        }
      }
      useEffect(() => {
          userLoggedIn();
      },[]);

    // Data storage variables
    const paramsData = useParams();
    const [loggedin,setLoggedIn] = useState(false);
    const [details,setDetails] = useState([]);
    const [myData,setMyData] = useState(true);
    const [follows,setFollows] = useState([]);
    const followsRef = useRef(follows);
    useEffect(()=>{followsRef.current = follows},[follows]);
    const [follow,setFollow] = useState(false);
    const followRef = useRef(follow);
    useEffect(()=>{followRef.current = follow},[follow]);
    const navigation = useNavigate();

    const getUser = async (queryUsername) => {
        var res = "";
        if (queryUsername !== null) {   // Other user details
            setMyData(false);
            res = await axios.get(`http://192.168.29.188:8080/user/getUser/${queryUsername}`,{"withCredentials":true});
            if (res.data.status === "ok") {     // If such user exists
                if (followsRef.current.indexOf(res.data.username) !== -1) {setFollow(true);}
                setDetails(res.data);
            } else {navigation("/");}
        } else {    // Base user details
            res = await axios.get("http://192.168.29.188:8080/user",{"withCredentials":true});
            setFollows(res.data.follows);
            if (!paramsData["uname"]) {setDetails(res.data);}
        }
    }
  async function handleFollowClick() {
    if (loggedin) {
        // Updating the following list
        const updatedFollows = follow ? follows.filter((follow) => follow !== paramsData["uname"]) : [...follows, paramsData["uname"]];
        if (updatedFollows.length > follows.length) {   // Creates room for both the users
            console.log("Sending request to create room");
            axios.post("http://192.168.29.188:8080/chat/createRoom",{user: paramsData["uname"]},{"withCredentials":true});
        }
        setFollows(updatedFollows);

        // Sending the request to backend
        const body = {follows : updatedFollows}
        const res = await axios.post("http://192.168.29.188:8080/user/setFollows",body,{"withCredentials":true});
        
        // Changing the UI on response from backend
        if (res.data.stats) {
            console.log("set follows is working");
            setFollow(!follow);
        }
    } else {
        navigation(`/signin?next=profile/${paramsData["uname"]}`);
    }
  }
  return (
        <div className='mainContainer'>
            <FeedLeftNavbar />
            <div className="profileMiddleContainer">
                <div className='userDetailsContainer'>
                    <div className="leftblock">
                        <div className="profilePic">
                            <img src={`http://192.168.29.188:8080/public/images/${details.profile}`} alt="" className="imgContainer" />
                            @{details.username}
                            {
                                myData ? "" :
                                <button className="followBtn" onClick={handleFollowClick} style={follow ? {backgroundColor:'black',border:'2px Solid rgb(40,40,40)'}:{}}>
                                    {follow ? `Following` : `Follow`} 
                                </button>
                            }
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
                                <div className="statsCount"> 13K </div>
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