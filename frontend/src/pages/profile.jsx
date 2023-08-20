import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import '../pages/profile.css'
import FeedLeftNavbar from './pageComponents/FeedLeftNavbar';
import { useNavigate } from 'react-router-dom';
import { BiCommentDetail, BiRepost, BiShareAlt, BiSolidDislike, BiSolidLike } from 'react-icons/bi'

function Profile({address}) {
    // Dark Mode or Light Mode.
    useEffect(()=>{
      if (localStorage.getItem('displayMode')) {
          document.documentElement.style.setProperty('--bg-clr','255,255,255');
          document.documentElement.style.setProperty('--fg-clr','0,0,0');
      }
    })
    // Login  
    const userLoggedIn = async () => {
        const res = await axios.get(`${address}/user/islogged`,{"withCredentials":true});
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
    const [feedThreads,setFeedThreads] = useState([]);
    const [replies,Setreplies] = useState(false);
    const [follows,setFollows] = useState([]);
    const followsRef = useRef(follows);
    useEffect(()=>{followsRef.current = follows},[follows]);
    const [follow,setFollow] = useState(false);
    const followRef = useRef(follow);
    useEffect(()=>{followRef.current = follow},[follow]);
    const navigation = useNavigate();

    const getThreads = async (username) => {
        const res = await axios.get(`${address}/threads/get-user-threads`,{"withCredentials":true,
        params : {
            "username" : username
        }            
        });
        if (res.data.status) {setFeedThreads(res.data.threads)}
    }

    const getUser = async (queryUsername) => {
        var res = "";
        if (queryUsername !== null) {   // Other user details
            setMyData(false);
            res = await axios.get(`${address}/user/getUser/${queryUsername}`,{"withCredentials":true});
            if (res.data.status === "ok") {     // If such user exists
                if (followsRef.current.indexOf(res.data.username) !== -1) {setFollow(true);}
                setDetails(res.data);
                getThreads(queryUsername);
            } else {navigation("/");}
        } else {    // Base user details
            res = await axios.get(`${address}/user`,{"withCredentials":true});
            setFollows(res.data.follows);
            if (!paramsData["uname"]) {
                setDetails(res.data);
                getThreads(res.data.username);
            }
        }
    }
  async function handleFollowClick() {
    if (loggedin) {
        // Updating the following list
        const updatedFollows = follow ? follows.filter((follow) => follow !== paramsData["uname"]) : [...follows, paramsData["uname"]];
        if (updatedFollows.length > follows.length) {   // Creates room for both the users
            console.log("Sending request to create room");
            axios.post(`${address}/chat/createRoom`,{user: paramsData["uname"]},{"withCredentials":true});
        }
        setFollows(updatedFollows);

        // Sending the request to backend
        const body = {follows : updatedFollows}
        const res = await axios.post(`${address}/user/setFollows`,body,{"withCredentials":true});
        
        // Changing the UI on response from backend
        if (res.data.stats) {
            setFollow(!follow);
        }
    } else {
        navigation(`/signin?next=profile/${paramsData["uname"]}`);
    }
  }
  return (
        <div className='mainContainer'>
            <FeedLeftNavbar address={address} />
            <div className="profileMiddleContainer">
                <div className='userDetailsContainer'>
                    <div className="leftblock">
                        <div className="profilePic">
                            <img src={`${address}/public/images/${details.profile}`} alt="No Profile" className="imgContainer" />
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

                <div className="userThreadsContainer" 
                style={feedThreads.length === 0 ? {fontSize:"30px",fontWeight:"700",justifyContent:"center"} : {}}>
                    {feedThreads.length !== 0 ? feedThreads.map((thread,index)=>(
                        <div className="threadContainer" style={{width:"100%",maxWidth:"800px",minWidth:"300px"}} key={index}>
                            <div className="topLevel">    
                                <img className="ThreadprofilePic" key={index} src={`${address}/public/images/${details.profile}`} alt="A" width="40px" />
                                <div className="userDetails">
                                    <div className="userNameBlock" key={index}> @{thread.username} </div>
                                    <div className="datetimeBlock"> {new Date(thread.time).toLocaleTimeString()} </div>
                                </div>
                            </div>
                            <div className="threadContent" key={index}>
                                {thread.message.text}
                                {
                                    thread.message.image.length !== 0 ?
                                    <div className="FeedPostContentImages">
                                    {
                                            thread.message.image.map((image,index1) => {
                                                return <img src={`${address}/public/images/${image}`} alt='Ntg' key={index1} className='FeedPostImage' />
                                            })
                                    } 
                                    </div>
                                : ""
                                }
                                <div className="threadStats">
                                    {/* comment | Share | Repost | Likes */}
                                    <BiCommentDetail className='threadStatsItem' />
                                    <BiShareAlt className='threadStatsItem' />
                                    <BiRepost className='threadStatsItem' />
                                    <BiSolidLike className='threadStatsItem' />
                                    <BiSolidDislike className='threadStatsItem' />
                                </div>
                            </div>
                            <div onClick={()=>{Setreplies(!replies);}} className="showReplyBtn">replies 1.6K</div>
                            {
                            replies ?
                            <div className="threadComments">
                                {/* Posting a reply comes here */}
                                {/* Nuumber of replies comes here */}
                            <div className="topLevel">    
                                <div className="ThreadprofilePic"> M </div>

                                <div className="userDetails">
                                    <div className="userNameBlock"> @Master </div>
                                    <div className="datetimeBlock"> 53 min</div>
                                </div>
                            </div>
                            <div className="threadContent">
                                This is a thread content block. <br /><br /><br />
                                thread content is written here.
                                <div className="threadStats">
                                    <BiCommentDetail className='threadStatsItem' />
                                    <BiShareAlt className='threadStatsItem' />
                                    <BiRepost className='threadStatsItem' />
                                    <BiSolidLike className='threadStatsItem' />
                                    <BiSolidDislike className='threadStatsItem' />
                                </div>
                            </div>
                        </div> : ""
                        }
                        </div>
                    )) : "No Threads created by this user"}
                </div>
            </div>
        </div>
  )
}

export default Profile