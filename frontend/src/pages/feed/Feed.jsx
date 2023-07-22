import React from 'react'
import { useState } from 'react'

import '../feed/Feed.css'

function Feed() {
  let id = 1053;
  const [uname,setUname] = useState('Master');
  const [postInput,setPostInput] = useState('');
  const [feedThreads,setFeedThreads] = useState([{'uname':'Master','content':'This is a thread content'},
                     {'uname':'Master','content':'This is second thread content'},
                    ]);
  const [frndSuggestions,setFrndSuggestions] = useState([{'uname':'Ulitmatum','desc':'follows You'},
                                                         {'uname':'Ultimatum','desc':'Suggested for You'},
                                                         {'uname':'Ultimatum','desc':'Suggested for You'},
                                                         {'uname':'Ultimatum','desc':'Suggested for You'},
                                                         {'uname':'Ultimatum','desc':'follows You'},
                                                         {'uname':'Ultimatum','desc':'follows You'},
                                                         {'uname':'Ultimatum','desc':'follows You'},
                                                ])
  function handlePost() {
    let threadData = {'uname' : uname, 'content': postInput};
    setFeedThreads(current => [threadData,...current]);
    setPostInput('');
  }
  const handlePostContent = (event)=> {
    setPostInput(event.target.value);
  }
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
            <div className="FeedPostThread">
                <div className="FeedPostTopLevel">
                    <div className="FeedPostProfilePic"> M </div>
                    <div className="FeedPostTopContents">
                        <div className="FeedPostUserName"> @{uname} </div>
                        <button className="FeedPostButton" onClick={handlePost}> Post </button>
                    </div>
                </div>
                <textarea className="FeedPostContent" value={postInput} placeholder='Write Something here.' onChange={handlePostContent}>
                </textarea>
                <div className="FeedPostBottomLevel">
                    <div className="FeedPostTag">#</div>
                    <div className="FeedPostAccess">Anyone can reply</div>    
                </div>            
            </div>

            {feedThreads.map((thread,index)=>(
                <div className="threadContainer" key={index}>
                    <div className="topLevel">    
                        <div className="ThreadprofilePic" key={index}> M </div>

                        <div className="userDetails">
                            <div className="userNameBlock" key={index}> @{thread.uname} </div>
                            <div className="datetimeBlock"> 53 min</div>
                        </div>
                    </div>
                    <div className="threadContent" key={index}>
                        {thread.content}
                        <div className="threadStats">
                            comment | Share | Repost | Likes
                        </div>
                    </div>
                    <div className="threadComments">
                        No comments yet.
                    </div>
                </div>
            ))}
                
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

export default Feed