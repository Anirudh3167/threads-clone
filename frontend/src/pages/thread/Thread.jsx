import React, { useState } from 'react'

import '../thread/Thread.css'

function Thread() {
  const [replies,Setreplies] = useState(false);
  const [threeDots,setThreeDots] = useState(false);
  const [otherUser,setOtherUser] = useState(true);
  return (
    <div className='singleThreadmainContainer'>
        <div className="threadMainContainer">
            <div className="threadContainer">
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
                        comment | Share | Repost | Likes
                    </div>
                </div>
                <div className="threadComments">
                    No comments yet.
                </div>
                <div className="threadEditContainer">
                    <div className="threeDotsContainer" onClick={() => {setThreeDots(!threeDots)}}>
                        {` . . . `}
                    </div>
                    <div className="threadReportContainer" style={threeDots ? {display:"flex"} : {display:"none"}}>
                        {otherUser ? 
                            <div className="threadReportItem"> Report </div>
                        :
                            <div className="threadReportItem"> Edit </div>
                        }
                        <div className="threadReportItem"> Add Collection </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="threadMainContainer">
            <div className="threadContainer">
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
                        comment | Share | Repost | Likes
                    </div>
                </div>
                <div className="threadComments">
                    No comments yet.
                </div>
            </div>
        </div>

        <div className="threadMainContainer">
            <div className="threadContainer">
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
                        comment | Share | Repost | Likes
                    </div>
                </div>
                {
                    replies ?
                    <div className="threadComments">
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
                            comment | Share | Repost | Likes
                        </div>
                    </div>
                </div> : 
                <div onClick={()=>{Setreplies(!replies);}} className="showReplyBtn">replies 1.6K</div>
                }
            </div>
        </div>

        <div className="threadMainContainer">
            <div className="threadContainer">
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
                        comment | Share | Repost | Likes
                    </div>
                </div>
                <div className="threadComments">
                    No comments yet.
                </div>
            </div>
        </div>
    </div>
  )
}

export default Thread