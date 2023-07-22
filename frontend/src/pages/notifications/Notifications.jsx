import React from 'react'
import { useState } from 'react';

import '../feed/Feed.css'
import '../notifications/Notifications.css'

function Notifications() {
    const [frndSuggestions,setFrndSuggestions] = useState([{'uname':'Ulitmatum','desc':'follows You'},
                                                         {'uname':'Ultimatum','desc':'Suggested for You'},
                                                         {'uname':'Ultimatum','desc':'Suggested for You'},
                                                         {'uname':'Ultimatum','desc':'Suggested for You'},
                                                         {'uname':'Ultimatum','desc':'follows You'},
                                                         {'uname':'Ultimatum','desc':'follows You'},
                                                         {'uname':'Ultimatum','desc':'follows You'},
                                                ]);
    return (
        <div className="FeedMainContainer">
    
    {/* Left Container */}
    
            <div className="FeedLeftContainer">
                <div className="FeedNavBar">
                    <div className="FeedHamburger"></div>
                    <div className="FeedNavbarContents">
                        <a href="/profile" className="FeedNavbarItem"> Profile </a>
                        <a href="/find-friends" className="FeedNavbarItem"> Friends </a>
                        <a href="/feed" className="FeedNavbarItem"> Feed </a>
                        <a href="#" className="FeedNavbarItem"> News </a>
                        <a href="/notifications" className="FeedNavbarItem"> Notifications </a>
                        <a href="/settings" className="FeedNavbarItem"> Settings </a>
                    </div>
                </div>
            </div>
    
    {/* Middle Container */}
    
            <div className="FeedMiddleContainer">
                 <div className="notificationHeading"> Notifications </div>
                 <div className="notificationsContainer">
                    <div className="noNotificationsText">
                        No notifications here.
                    </div>
                 </div>
            </div>
    
    {/* Right Container */}
    
            <div className="FeedRightContainer">
                <input type="text" defaultValue='' className='FeedFrndSuggesstionBox' placeholder='Search for friends' />
                <div className="FeedRightContent">
                    Suggestions for you
                    <a href='#' className="FeedRightSeeAllBtn"> See All </a>
                </div>
                <div className="FeedFrndSuggestions">
                    {frndSuggestions.map((frnd,index) =>(
                        <div className="FeedFrndContainer" key={index}>
                            <div className="FeedFrndDP"> U </div>
                            <div className="FeedFrndDetails">
                                <div className="FeedFrndMainDetails">
                                    <div className="FeedFrndUserName" key={index}> @{frnd.uname} </div>
                                    <div className="FeedFrndFollowStats" key={index}> {frnd.desc} </div>
                                </div>
                                <div className="FeedFrndFollowBtn"> Follow </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )
}

export default Notifications