import React from 'react'
import { useState } from 'react';

import '../feed/Feed.css'
import '../friends/FindFriends.css'

function FindFriends() {
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
    {/* Right Container */}
            <div className="FindFriendsRightContainer">
                Find friends Page.
            </div>
        </div>
      )
}

export default FindFriends