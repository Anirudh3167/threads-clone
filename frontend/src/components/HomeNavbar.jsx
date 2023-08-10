import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../components/HomeNavbar.css';
import { useNavigate } from 'react-router-dom';

function HomeNavbar({address}) {
  const [hamburgerActive,setHamburgerActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigate();
  const handleLogout = async () => {
    const res = await axios.post(`${address}/user/logout`,{},{"withCredentials":true});
    if (res.data["result"] === "success") {
      navigation("/");
      setLoggedIn(false);
    }
  }
  const userLoggedIn = async () => {
    const res = await axios.get(`${address}/user/islogged`,{"withCredentials":true});
    if (res.data["stats"]) {setLoggedIn(true);}
  }
  useEffect(()=>{
    userLoggedIn();
  },[])
  return (
    <div className='NavmainContainer'>
      <div className='logoSpace'>Threads Clone</div>

      <div className="verticalNavHolder">  
        <div className={`navHamburger ${hamburgerActive ? "activeHamburger" : ""}`} onClick={()=>{console.log("clicked");setHamburgerActive(!hamburgerActive)}}>
              <div className="HamburgerLine TopHamburger"></div>
              <div className="HamburgerLine MidHamburger"></div>
              <div className="HamburgerLine BottomHamburger"></div>
        </div>
        <div className='linksHolder'>
          <a href='/' className='link' >
            Home
          </a>
          <a href='/about' className='link'>
            About
          </a>
          {loggedIn ? (
            <a href='/feed' className='link'>
              Feed
            </a>
            
          ) : null}
          {loggedIn ? (
            <a href='/profile' className='link'>
              Profile
            </a>
            
          ) : null}
          {
            loggedIn ?
            <div onClick={() => {handleLogout()}} className='loginLink' style={{backgroundColor:"red"}}>
              logout
            </div> :
            <a href='/signin' className='loginLink'>
              login / Signup
            </a>
          }
        </div>
      </div>

    </div>
  );
}

export default HomeNavbar;
