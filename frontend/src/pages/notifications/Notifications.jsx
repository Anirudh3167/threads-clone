import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

import '../feed/Feed.css'
import '../notifications/Notifications.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar';
import FeedRightContainer from '../pageComponents/FeedRightContainer';
import { useNavigate } from 'react-router-dom';

function Notifications() {
    const navigation = useNavigate();
    const [notifications,setNotifications] = useState([{'reciever':'Master','performer':'Ultimatum','action':'follows you'},
                                                    {'reciever':'Master','performer':'Ultimatum','action':'likes your thread 123'},
                                                    {'reciever':'Master','performer':'Ultimatum','action':'likes your thread 456'},
                                                    {'reciever':'Master','performer':'Ultimatum','action':'likes your thread 789'},
                                                    {'reciever':'Master','performer':'Ultimatum','action':'likes your thread 243'},
                                                    ]);
    const userLoggedIn = async () => {
        const res = await axios.get("http://192.168.29.188:8080/user/islogged",{"withCredentials":true});
        if (!res.data["stats"]) {
        navigation("/signin?next=notifications");
        }
    }
    useEffect(() => {
        userLoggedIn();
    },[]);
    return (
        <div className="FeedMainContainer">
    
    {/* Left Container */}
    
            <FeedLeftNavbar />
    
    {/* Middle Container */}
    
            <div className="FeedMiddleContainer">
                 <div className="notificationHeading"> Notifications </div>
                 <div className="notificationsContainer">
                 {  (notifications === []) ?
                    <div className="noNotificationsText">
                        No notifications here.
                    </div> :
                    notifications.map((notification,index) => (
                        <div className="NotificationMainContainer" key={index}>
                            <div className="NotificationPic"> U </div>
                            <div className="NotificationDetails">
                                <div className="NotificationTime"> 59min ago</div>
                                <div className="NotificationMsg" key={index}>
                                    <div className="NotificationPerformer" key={index}>
                                        @{notification.performer}
                                    </div>
                                        {notification.action}
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
    
    {/* Right Container */}
            <FeedRightContainer />
        </div>
      )
}

export default Notifications