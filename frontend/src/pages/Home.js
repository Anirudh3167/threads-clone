import React from 'react'

import './Home.css'
import HomeNavbar from '../components/HomeNavbar.jsx'



function Home({ address }) {
  console.log(address);
  window.addEventListener("scroll",(e) => {
    let a = window.scrollY;
    console.log(a);
  })
  return (
    <div>
      <HomeNavbar address={address} />
      <div className='HomemainContainer'>
        <div className="HomeContainerSlide1">
          <div className="HomeSlide1Content">
            Threads Clone
            <div className="HomeSlide1KeyLine">
              Eaiser than Twitter and faster than Threads
            </div>
          </div>
          <div className="HomeSlide1ImageContainer">
            <img src={`${address}/public/images/Home_Page_Image.jpeg`} alt="" className='HomeSlide1Image' />
            <div className="HomeSlide1ImageLight"></div>
          </div>
        </div>
          {/* <div className="HomekeyFeatures">
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
          </div> */}
      </div>
    </div>
  )
}

export default Home