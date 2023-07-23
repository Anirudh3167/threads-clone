import React from 'react'
import { useState } from 'react';

import '../feed/Feed.css'
import '../settings/Settings.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar';

function Settings() {
    return (
        <div className="FeedMainContainer">
    
    {/* Left Container */}
        <FeedLeftNavbar />
    {/* Right Container */}
            <div className="SettingsRightContainer">
                <div className="pageSettings">
                    <div className="darkModeSetting">
                        Dark mode
                    </div>
                </div>
                <div className="siteSettings">  
                    <div className="ChatReachSetting">
                        Who can reach you?      {/* Personal Chat */}
                    </div>
                    <div className="recieveNotificationSetting">
                        Recieve Notficiations
                    </div>
                    <div className="personalizedAdsSetting">
                        Recieve Personalized ads
                    </div>
                    <div className="feedTypeSetting">
                        {/* Checkboxes with multi select */}
                        Trending <br />
                        Your contacts <br />
                        Your Interests
                    </div>
                    <div className="converstaionBotSetting">
                        {/* Checkboxes with single select */}
                        LAMA <br />
                        Alpha <br />
                        Recon <br />
                        None
                        {/* Used for auto reply purpose */}
                    </div>
                </div>
            </div>
        </div>
      )
}

export default Settings