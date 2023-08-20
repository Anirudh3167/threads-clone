import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Search.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar'
import { BiCommentDetail, BiRepost, BiShareAlt, BiSolidDislike, BiSolidLike } from 'react-icons/bi';

function Search({address}) {
  // Dark Mode or Light Mode.
  useEffect(()=>{
    if (localStorage.getItem('displayMode')) {
        document.documentElement.style.setProperty('--bg-clr','255,255,255');
        document.documentElement.style.setProperty('--fg-clr','0,0,0');
    }
  })
  const [searchInput,setSearchInput] = useState('');
  const [seraching,setSearching] = useState(false);
  const [userResults,setUserResults] = useState([]);
  const [userDetails,setUserDetails] = useState([]);
  const [feedThreads,setFeedThreads] = useState([]);
  const [replies,Setreplies] = useState(false);
  const navigation = useNavigate();

  const handleSearch = async(event) => {
    setSearching(true);
    const search = event.target.value;
    setSearchInput(search);
    if (search !== "") {
      const res = await axios.get(`${address}/user/search`,{"withCredentials":true,
        "params": {
          "query" : event.target.value
        }
      });
      const thread_res = await axios.get(`${address}/threads/search`,{"withCredentials":true,
        "params" : {
          "query" : event.target.value
        }
      })
      if (res.data.status) {
        // Removing the current user from the list.
        setUserResults(res.data.users.filter(user => user.username !== userDetails.username));
      }
      if (thread_res.data.status) {
        // Getting the relevant threads
        setFeedThreads(thread_res.data.threads);
      }
      setSearching(false);
    } else  {
      setSearching(false);
      setUserResults([]);
      setFeedThreads([]);
    }
  }

  // Checking user authentication
  const getUser = async () => {
    const res = await axios.get(`${address}/user`,{"withCredentials":true});
    setUserDetails(res.data);
  }
  const userLoggedIn = async () => {
    const res = await axios.get(`${address}/user/islogged`,{"withCredentials":true});
    if (!res.data["stats"]) {
      navigation("/signin?next=settings");
    } else {
      getUser();
    }
  }
  useEffect(() => {
      userLoggedIn();
  },[]);
  return (
    <div className='FeedMainContainer'>
        <FeedLeftNavbar address={address} />
        <div className="SearchRightContainer">
            <input type="text" className="InputBox SearchInputBox" placeholder='Search here' onChange={(e) => {handleSearch(e)}} />
            {
              seraching ? "searching" : (
              (userResults.length !== 0 || feedThreads.length !== 0) ?
              <div className="FollowingContainer">
                {
                  userResults.length !== 0 ?
                  <div className="FollowingHeading"> Users </div>
                  : ""
                }
              <div className="FollowingUsersContainer" style={{width:"100%",maxWidth:"800px",minWidth:"300px"}}>
                  {
                      userResults.map((user,index) => (
                          <div className="FollowingUserItem" key={index}>
                              <div className="SearchUserProfile"> 
                                <img src={`${address}/public/images/${user.profile}`} alt="" className="imgContainer" width="70px" height="70px" />
                              </div>
                              <div className="FollowingUserDetails">
                                  <div className="FollowingTopLevelDetails">
                                      <div className="FollowingUserName"> @{user.username} </div>
                                      {
                                        user.follows.indexOf(userDetails.username) !== -1 ? 
                                          <div className="FollowingUserBtn"> unfollow </div>
                                        :
                                        <div className="FollowingUserBtn" style={{backgroundColor:"black",color:"white",border:"2px solid rgb(40,40,40)"}}> follow </div>
                                      }
                                  </div>
                                  <div className="FollowingUserBio">{user.bio}</div>
                              </div>
                          </div>
                      ))
                  }
                  
              </div>
              {
                feedThreads.length !== 0 ?
                <div className="FollowingHeading"> Threads </div>
                : ""
              }
              {feedThreads.map((thread,index)=>(
                <div className="threadContainer" style={{width:"100%",maxWidth:"800px",minWidth:"300px"}} key={index}>
                    <div className="topLevel">    
                        {/* <img className="ThreadprofilePic" key={index} src={`${address}/public/images/${thread.profile}`} alt="A" width="40px" /> */}
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
           </div>  : "No results" )
            }
        </div>
    </div>
  )
}

export default Search