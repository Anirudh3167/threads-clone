import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'

import '../feed/Feed.css'
import './Following.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar';
import { useNavigate } from 'react-router-dom';

function Following({ address }) {
  // Dark Mode or Light Mode.
  useEffect(()=>{
    if (localStorage.getItem('displayMode')) {
        document.documentElement.style.setProperty('--bg-clr','255,255,255');
        document.documentElement.style.setProperty('--fg-clr','0,0,0');
    }
  })
    const user_list = [{"name":"Ultimatum","Bio":"Your friendly neighbour"},
                    {"name":"Nicholas","Bio":"S.H.I.E.L.D Agent. Currently working at secret wars"},
                    {"name":"Nebula","Bio":"A galaxy far from the earth"},
                    {"name":"stephen","Bio":"Aka Dr Strange. Want to see magic? then follow me"},
                    {"name":"Victor von Doom","Bio":"The king of Latveria. About to become god emperor"}];
    const [users,setUsers] = useState(user_list);
    const navigation = useNavigate();
    const userLoggedIn = async () => {
      const res = await axios.get(`${address}/user/islogged`,{"withCredentials":true});
      if (!res.data["stats"]) {
        navigation("/signin?next=following");
      }
    }
    useEffect(() => {
        userLoggedIn();
    },[]);
    return (
        <div className="FeedMainContainer">
    
    {/* Left Container */}   
            <FeedLeftNavbar address={address} />
    {/* Right Container */}
            <div className="FollowingRightContainer">
                 <div className="FollowingContainer">
                    <div className="FollowingHeading"> Following </div>
                    <div className="FollowingUsersContainer">
                        {
                            users.map((user,index) => (
                                <div className="FollowingUserItem" key={index}>
                                    <div className="FollowingUserProfile"> M </div>
                                    <div className="FollowingUserDetails">
                                        <div className="FollowingTopLevelDetails" key={index}>
                                            <div className="FollowingUserName" key={index}> @{user.name} </div>
                                            <div className="FollowingUserBtn"> unfollow </div>
                                        </div>
                                        <div className="FollowingUserBio" key={index}>{user.Bio}</div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                 </div>
                 <div className="FollowersContainer">
                    <div className="FollowingHeading"> Followers </div>
                    <div className="FollowingUsersContainer">
                        {
                            users.map((user,index) => (
                                <div className="FollowingUserItem" key={index}>
                                    <div className="FollowingUserProfile"> M </div>
                                    <div className="FollowingUserDetails">
                                        <div className="FollowingTopLevelDetails" key={index}>
                                            <div className="FollowingUserName" key={index}> @{user.name} </div>
                                            <div className="FollowingUserBtn"> follow </div>
                                        </div>
                                        <div className="FollowingUserBio" key={index}>{user.Bio}</div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                 </div>
            </div>
        </div>
      )
}

export default Following