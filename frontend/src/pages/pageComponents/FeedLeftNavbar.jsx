import React, { useState } from 'react'

import '../feed/Feed.css'

function FeedLeftNavbar({ address }) {
  const [feedHamburgerActive,setFeedHamburgerActive] = useState(false);
  return (
    <div className="FeedLeftContainer" style={feedHamburgerActive ? {height:"100vh"}:{}}>
        <div className={`feedNavHamburger ${feedHamburgerActive ? "activeFeedHamburger" : ""}`} onClick={()=>{console.log("clicked");setFeedHamburgerActive(!feedHamburgerActive)}}>
              <div className="HamburgerLine TopHamburger"></div>
              <div className="HamburgerLine MidHamburger"></div>
              <div className="HamburgerLine BottomHamburger"></div>
        </div>
        <div className="FeedNavBar">
            <div className="FeedNavbarContents">
                <a href="/search" className="FeedNavbarItem"> Search </a>
                <a href="/profile" className="FeedNavbarItem"> Profile </a>
                <a href="/following" className="FeedNavbarItem"> Following </a>
                <a href="/feed" className="FeedNavbarItem"> Feed </a>
                <a href="/collection" className="FeedNavbarItem"> Collections </a>
                <a href="/chat" className="FeedNavbarItem"> Chat </a>
                <a href="/notifications" className="FeedNavbarItem"> Notifications </a>
                <a href="/settings" className="FeedNavbarItem"> Settings </a>
            </div>
        </div>
    </div>
  )
}

export default FeedLeftNavbar