import React from 'react'

import '../pages/Home.css'
import HomeNavbar from '../components/HomeNavbar.jsx'

function Home() {
  window.addEventListener("scroll",(e) => {
    let a = window.scrollY;
    console.log(a);
  })
  return (
    <div>
      <HomeNavbar />
      <div className='HomemainContainer'>
          <div className="HomekeyFeatures">
            Explains about the key features.
          </div>
          <div className="HomekeyFeatures">
            Better Security
          </div>
          <div className="HomekeyFeatures">
            More friendly UI
          </div>
          <div className="HomekeyFeatures">
            News Updates
          </div>
      </div>
    </div>
  )
}

export default Home