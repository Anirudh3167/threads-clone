import React, { useState } from 'react';

import '../components/HomeNavbar.css';

function HomeNavbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to toggle the login state
  const handleLoginClick = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div className='NavmainContainer'>
      <div className='logoSpace'>Threads Clone</div>

      <div className='linksHolder'>
        <a href='/' className='link' >
          Home
        </a>
        <a href='/feed' className='link' >
          Feed
        </a>
        <a href='/about' className='link'>
          About
        </a>
        {loggedIn ? (
          <a href='/profile' className='link'>
            Profile
          </a>
        ) : null}
        <button onClick={handleLoginClick} className='loginLink' style={loggedIn ? {backgroundColor:"red"}:{}}>
          {loggedIn ? 'Logout' : 'Login / Signup'}
        </button>
      </div>
    </div>
  );
}

export default HomeNavbar;
