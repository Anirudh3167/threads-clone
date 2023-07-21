import React from 'react'

import '../feed/Feed.css'

function Feed() {
  return (
    <div className="FeedMainContainer">
        <div className="FeedLeftContainer">
            Vertical Navbar. <br /><br />
            Profile <br />
            Friends <br />
            Feed <br />
            News <br />
            Activity <br />
            Settings
        </div>
        <div className="FeedMiddleContainer">
            <div className="FeedPostThread">
                <div className="FeedPostTopLevel">
                    <div className="FeedPostProfilePic"> M </div>
                    <div className="FeedPostTopContents">
                        <div className="FeedPostUserName"> @Master </div>
                        <div className="FeedPostButton"> Post </div>
                    </div>
                </div>
                <textarea className="FeedPostContent">
                    Write Something here.    
                </textarea>
                <div className="FeedPostBottomLevel">
                    <div className="FeedPostTag">#</div>
                    <div className="FeedPostAccess">Anyone can reply</div>    
                </div>            
            </div>

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

        <div className="FeedRightContainer">
            Friends Suggestions. <br /><br />
            SearchBar <br />
            Suggestions for you <br />
            Members
        </div>
    </div>
  )
}

export default Feed