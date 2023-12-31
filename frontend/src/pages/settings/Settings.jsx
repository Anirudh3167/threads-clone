import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'

import '../feed/Feed.css'
import '../settings/Settings.css'
import '../../index.css'

import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar';
import { useNavigate } from 'react-router-dom';

function Settings({ address }) {
    const toggleBtns = {
                        'darkMode':localStorage.getItem('displayMode') ? true : false,
                        'personalChat':false,
                        'recieveNotifications':true,
                        'personalizedAds':false
                        };
    const [toggleBtn,setToggleBtn] = useState(toggleBtns);
    const [feedSetting,setFeedSetting] = useState('Trending');
    const [chatbotSetting,setChatbotSetting] = useState('None');
    const [hideFeedDropDown,setFeedDropDown] = useState(true);
    const [hideChatbotDropDown,setChatbotDropDown] = useState(true);
    const navigation = useNavigate();

    useEffect(()=>{
        // Dark Mode.
        if (toggleBtn["darkMode"]) {
            localStorage.setItem('displayMode','light');
            document.documentElement.style.setProperty('--bg-clr','255,255,255');
            document.documentElement.style.setProperty('--fg-clr','0,0,0');
        } else {
            localStorage.removeItem('displayMode');
            document.documentElement.style.setProperty('--fg-clr','255,255,255');
            document.documentElement.style.setProperty('--bg-clr','0,0,0');
        }
    },[toggleBtn]);

    const toggleAction = (event,key) => {
        event.preventDefault();

        setToggleBtn((prevState) => ({...prevState,[key]: !prevState[key]}));
    }
    const handleFeedSetting = (event,feedType) => {
        event.preventDefault();
        setFeedSetting(feedType);
        setFeedDropDown(true);
    }
    const handleChatbotSetting = (event,ChatbotType) => {
        event.preventDefault();
        setChatbotSetting(ChatbotType);
        setChatbotDropDown(true);
    }
    const handlelogout = async () => {
        const res = await axios.post(`${address}/user/logout`,{},{"withCredentials":true});
        if (res.data["result"] === "success") {
            navigation("/");
        }
    }
    const userLoggedIn = async () => {
      const res = await axios.get(`${address}/user/islogged`,{"withCredentials":true});
      if (!res.data["stats"]) {
        navigation("/signin?next=settings");
      }
    }
    useEffect(() => {
        userLoggedIn();
    },[]);
    return (
        <div className="FeedMainContainer">
    
    {/* Left Container */}
        <FeedLeftNavbar address={address} />
    {/* Right Container */}
            <div className="SettingsRightContainer">
                <div className="pageSettings">
                    <div className="SettingsItem">
                        Dark mode
                        <div className={`toggleBtnContainer ${toggleBtn["darkMode"] ?  "" : "toggleActive"}`} onClick={(e) => {toggleAction(e,"darkMode")}}>
                            <div className="toggleRectangleBar">
                                <div className="toggleCircleBtn"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="siteSettings">  
                    <div className="SettingsItem">
                        Who can reach you?      {/* Personal Chat */}
                        <div className={`toggleBtnContainer ${toggleBtn["personalChat"] ? "toggleActive":""}`} onClick={(e) => {toggleAction(e,"personalChat")}}>
                            <div className="toggleRectangleBar">
                                <div className="toggleCircleBtn"></div>
                            </div>
                        </div>
                    </div>
                    <div className="SettingsItem">
                        Recieve Notficiations
                        <div className={`toggleBtnContainer ${toggleBtn["recieveNotifications"] ? "toggleActive":""}`} onClick={(e) => {toggleAction(e,"recieveNotifications")}}>
                            <div className="toggleRectangleBar">
                                <div className="toggleCircleBtn"></div>
                            </div>
                        </div>
                    </div>
                    <div className="SettingsItem">
                        Recieve Personalized ads
                        <div className={`toggleBtnContainer ${toggleBtn["personalizedAds"] ? "toggleActive":""}`} onClick={(e) => {toggleAction(e,"personalizedAds")}}>
                            <div className="toggleRectangleBar">
                                <div className="toggleCircleBtn"></div>
                            </div>
                        </div>
                    </div>
                    <div className="SettingsItem">
                        {/* Checkboxes with multi select */}
                        Feed Content :-
                        <div className="settingsItemDropDown">
                            <div className="DropDownCurrent" onClick={()=>{setFeedDropDown(!hideFeedDropDown)}}> {feedSetting} </div>
                            {(hideFeedDropDown) ? "":
                            <ul className="DropDownMenu">
                                <li className="DropDownItem" onClick={(e) => {handleFeedSetting(e,'Trending')}}> Trending </li>
                                <li className="DropDownItem" onClick={(e) => {handleFeedSetting(e,'Your Contacts')}}> Your Contacts </li>
                                <li className="DropDownItem" onClick={(e) => {handleFeedSetting(e,'Your Interests')}}> Your Interests </li>
                            </ul>}
                        </div>
                    </div>
                    <div className="SettingsItem">
                        {/* Checkboxes with single select */}
                        Chatbot Model :-
                        <div className="settingsItemDropDown">
                            <div className="DropDownCurrent" onClick={()=>{setChatbotDropDown(!hideChatbotDropDown)}}> {chatbotSetting} </div>
                            {(hideChatbotDropDown) ? "":
                            <ul className="DropDownMenu">
                                <li className="DropDownItem" onClick={(e) => {handleChatbotSetting(e,'LAMA')}}> LAMA </li>
                                <li className="DropDownItem" onClick={(e) => {handleChatbotSetting(e,'Alpha')}}> Alpha </li>
                                <li className="DropDownItem" onClick={(e) => {handleChatbotSetting(e,'Recon')}}> Recon </li>
                                <li className="DropDownItem" onClick={(e) => {handleChatbotSetting(e,'None')}}> None </li>
                            </ul>}
                        </div>
                        {/* Used for auto reply purpose */}
                    </div>
                </div>
                <div className="siteSettings">
                    <a href="/about" className="accountSettingsItem">
                        About Us
                    </a>
                    <a href="#" className="accountSettingsItem">
                        Terms and Conditions
                    </a>
                    <a href="#" className="accountSettingsItem">
                        Privacy Policy
                    </a>
                    <div className="accountSettingsItem" onClick={() => {handlelogout()}}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
      )
}

export default Settings