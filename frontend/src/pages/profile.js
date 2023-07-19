import React from 'react'
import { useState } from 'react'

import '../pages/profile.css'

function Profile() {
  const [follow,setFollow] = useState(false);
  function handleClick() {
    setFollow(!follow);
  }
  return (
    <div className='mainContainer'>
        <div className='userDetailsContainer'>
            <div className="leftblock">
                <div className="profilePic">
                    <div className="imgContainer"> M </div>
                    @Master
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
                <div className="userBio">Hi, This is the creator of this clone.</div>
            </div>
        </div>

        <div className="userThreadsContainer">
            User Threads here.
        </div>
    </div>
  )
}

export default Profile