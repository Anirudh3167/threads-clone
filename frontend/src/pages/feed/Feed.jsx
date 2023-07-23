import React from 'react'
import { useState } from 'react'

import '../feed/Feed.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar';
import FeedRightContainer from '../pageComponents/FeedRightContainer';

function Feed() {
  let id = 1053;
  const [uname,setUname] = useState('Master');
  const [postInput,setPostInput] = useState('');
  const [feedThreads,setFeedThreads] = useState([{'uname':'Master','content':'This is a thread content'},
                     {'uname':'Master','content':'This is second thread content'},
                    ]);
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

        <FeedLeftNavbar />

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

        <FeedRightContainer />
    </div>
  )
}

export default Feed