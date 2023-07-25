import React, { useState } from 'react';

import '../components/HomeNavbar.css';

function HomeNavbar() {
  const [hamburgerActive,setHamburgerActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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
          <button onClick={()=>{setLoggedIn(!loggedIn);}} className='loginLink' style={loggedIn ? {backgroundColor:"red"}:{}}>
            {loggedIn ? 'Logout' : 'Login / Signup'}
          </button>
        </div>
      </div>

    </div>
  );
}

export default HomeNavbar;
