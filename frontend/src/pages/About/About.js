import React from 'react'
import { BiLogoMongodb, BiLogoReact } from "react-icons/bi";
import { SiExpress } from "react-icons/si";
import { FaNode } from "react-icons/fa";

import HomeNavbar from '../../components/HomeNavbar'

import './About.css'

function About({ address }) {
  return (
    <div>
      <HomeNavbar address={address} />
      <div className="addressMainContainer">
        <div className="addressContainerSlide1">
          <div className="addressMainHeading"> What's new?</div>
            <ul className="addressMainContentContainer">
                <li className='addresContentItem'> Threads posting </li>
                <li className='addresContentItem'> Personal Messageing </li>
                <li className='addresContentItem'> Follows and follow backs </li>
                <li className='addresContentItem'> Video Call </li>
                <li className='addresContentItem'> Read reciepts </li>
            </ul>
          </div>
        </div>
        <div className="addressContainerSlide2">
          <div className="slideHeading"> Tech Stack </div>
          <div className="slideTwoContentContainer">
            <div className="slideTwoContentItem"><BiLogoMongodb fontSize='90px' /> Mongo</div>
            <div className="slideTwoContentItem"><SiExpress fontSize='90px' /> Express</div>
            <div className="slideTwoContentItem"><BiLogoReact fontSize='90px' /> React</div>
            <div className="slideTwoContentItem"><FaNode fontSize='90px' />Node</div>
          </div>
        </div>
    </div>
  )
}

export default About