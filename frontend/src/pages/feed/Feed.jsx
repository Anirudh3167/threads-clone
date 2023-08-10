import React, { useRef } from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

import '../feed/Feed.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar';
import FeedRightContainer from '../pageComponents/FeedRightContainer';
import { useNavigate } from 'react-router-dom';
import { BiCommentDetail, BiRepost, BiShareAlt, BiSolidDislike, BiSolidLike } from 'react-icons/bi';

function Feed({address}) {
  // Image variables
  const [Threadimages,setThreadImages] = useState([]);
  const [TestImage,setTestImage] = useState("");
  useEffect(()=>{setTestImage(Threadimages[0])},[Threadimages]);
  const ImageInputRef = useRef(null);
  // Normal Variables
  let id = 1053;
  const navigation = useNavigate();
  const [replies,Setreplies] = useState(false);
  const [details,setDetails] = useState([]);
  const [postInput,setPostInput] = useState('');
  const [feedThreads,setFeedThreads] = useState([]);
  const feedThreadsRef = useRef(feedThreads);
  useEffect(()=>{feedThreadsRef.current = feedThreads},[feedThreads]);
  async function handlePost() {
    if (postInput !== "") {
        let formData = new FormData();
        
        let threadData = {'username' : details.username, 'message': {'text' : postInput, 'image' : Threadimages},'time':new Date(),'replies':[]};
        formData.append("username",threadData.username);
        formData.append("message_text",threadData.message.text);
        for (let i = 0; i < Threadimages.length; i++) {
            formData.append("image",Threadimages[i]);
        }
        console.log(formData.get("image"));
        // formData.append("image",TestImage,TestImage.name);
        formData.append("time",threadData.time);
        formData.append("replies",threadData.replies);
        const res = await axios.post(`${address}/threads`,formData,{"withCredentials":true});
        if (res.data.stats) {
            if (res.data.images.length !== 0) {
                threadData.message.image(res.data.images);
            }
            setFeedThreads(current => [threadData,...current]);
            setPostInput('');
            setThreadImages([]);
        }
    } else {
        alert("Post Cannot be empty");
    }
  }
  const updateThreadImages = (e) => {
    // console.log(Threadimages);
    console.log("Uploading files");
    setThreadImages([...e.target.files]);
  }
  const handlePostContent = (event)=> {
    setPostInput(event.target.value);
  }
  const getUser = async () => {
    const res = await axios.get(`${address}/user`,{"withCredentials":true});
    setDetails(res.data);
  }
  const getThreads = async () => {
    const res = await axios.get(`${address}/threads`,{"withCredentials":true});
    if (res.data.stats) {
        const newThreads = res.data.threadsData.filter(thread => !feedThreadsRef.current.some(existingThread => existingThread.id === thread.id));
        setFeedThreads(current => [...newThreads,...current]);
    } else {
        console.log("Falied to fetch the threads");
    }
  }
  const userLoggedIn = async () => {
    const res = await axios.get(`${address}/user/islogged`,{"withCredentials":true});
    if (!res.data["stats"]) {
      navigation("/signin?next=feed");
    } else {
        getUser();
        getThreads();
    }
  }
  useEffect(() => {
      userLoggedIn();
  },[]);
  return (
    <div className="FeedMainContainer">
{/* Left Container */}

        <FeedLeftNavbar address={address} />

{/* Middle Container */}

        <div className="FeedMiddleContainer">
            <div className="FeedPostThread">
                <div className="FeedPostTopLevel">
                    <img  className="FeedPostProfilePic" src={`${address}/public/images/${details.profile}`} alt="A" width="40px" />
                    <div className="FeedPostTopContents">
                        <div className="FeedPostUserName"> @{details.username} </div>
                        <button className="FeedPostButton" onClick={handlePost}> Post </button>
                    </div>
                </div>
                <textarea className="FeedPostContent" value={postInput} placeholder='Write Something here.' onChange={handlePostContent}>
                </textarea>
                {
                    Threadimages && Threadimages.length !== 0 ?
                    <div className="FeedPostContentImages">
                {
                    Threadimages.map((image,index) => {
                        return <img src={URL.createObjectURL(image)} key={index} alt="Some Image" className='FeedPostImage' />
                    }) 
                }
                    </div>
                    : ""
                }
                <div className="FeedPostBottomLevel">
                    <div className="FeedPostTag" onClick={() => {ImageInputRef.current.click();}} style={{cursor:"pointer"}}>#</div>
                    <input type="file" ref={ImageInputRef} accept="image/*" onChange={(e) => updateThreadImages(e)} style={{display:"none"}} multiple />
                    <div className="FeedPostAccess">Anyone can reply</div>    
                </div>            
            </div>

            {feedThreads.map((thread,index)=>(
                <div className="threadContainer" key={index}>
                    <div className="topLevel">    
                        <img className="ThreadprofilePic" key={index} src={`${address}/public/images/${details.profile}`} alt="A" width="40px" />
                        <div className="userDetails">
                            <div className="userNameBlock" key={index}> @{thread.username} </div>
                            <div className="datetimeBlock"> {new Date(thread.time).toLocaleTimeString()} </div>
                        </div>
                    </div>
                    <div className="threadContent" key={index}>
                        {thread.message.text}
                        {
                            thread.message.image.length !== 0 ?
                            <div className="FeedPostContentImages">
                            {
                                    thread.message.image.map((image,index1) => {
                                        return <img src={`${address}/public/images/${image}`} alt='Ntg' key={index1} className='FeedPostImage' />
                                    })
                            } 
                            </div>
                        : ""
                        }
                        <div className="threadStats">
                            {/* comment | Share | Repost | Likes */}
                            <BiCommentDetail className='threadStatsItem' />
                            <BiShareAlt className='threadStatsItem' />
                            <BiRepost className='threadStatsItem' />
                            <BiSolidLike className='threadStatsItem' />
                            <BiSolidDislike className='threadStatsItem' />
                        </div>
                    </div>
                    <div onClick={()=>{Setreplies(!replies);}} className="showReplyBtn">replies 1.6K</div>
                    {
                    replies ?
                    <div className="threadComments">
                        {/* Posting a reply comes here */}
                        {/* Nuumber of replies comes here */}
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
                            <BiCommentDetail className='threadStatsItem' />
                            <BiShareAlt className='threadStatsItem' />
                            <BiRepost className='threadStatsItem' />
                            <BiSolidLike className='threadStatsItem' />
                            <BiSolidDislike className='threadStatsItem' />
                        </div>
                    </div>
                </div> : ""
                }
                </div>
            ))}
                
        </div>

{/* Right Container */}

        <FeedRightContainer address={address} />
    </div>
  )
}

export default Feed