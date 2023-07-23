import React from 'react'
import { useState } from 'react';

import '../feed/Feed.css'
import '../friends/FindFriends.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar';

function FindFriends() {
    return (
        <div className="FeedMainContainer">
    
    {/* Left Container */}   
            <FeedLeftNavbar />
    {/* Right Container */}
            <div className="FindFriendsRightContainer">
                Find friends Page.
            </div>
        </div>
      )
}

export default FindFriends