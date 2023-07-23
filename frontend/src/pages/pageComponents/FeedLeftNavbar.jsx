import React from 'react'

import '../feed/Feed.css'

function FeedLeftNavbar() {
  return (
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
  )
}

export default FeedLeftNavbar