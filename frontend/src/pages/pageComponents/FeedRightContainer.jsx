import React from 'react'
import { useState } from 'react';

import '../feed/Feed.css'

function FeedRightContainer({ address }) {
    const [frndSuggestions,setFrndSuggestions] = useState([{'uname':'Ulitmatum','desc':'follows You'},
                                                        {'uname':'Ultimatum','desc':'Suggested for You'},
                                                        {'uname':'Ultimatum','desc':'Suggested for You'},
                                                        {'uname':'Ultimatum','desc':'Suggested for You'},
                                                        {'uname':'Ultimatum','desc':'follows You'},
                                                        {'uname':'Ultimatum','desc':'follows You'},
                                                        {'uname':'Ultimatum','desc':'follows You'},
                                                    ]);
  return (
    <div className="FeedRightContainer">
        <input type="text" defaultValue='' className='FeedFrndSuggesstionBox' placeholder='Search for friends' />
        <div className="FeedRightContent">
            Suggestions for you
            <a href='#' className="FeedRightSeeAllBtn"> See All </a>
        </div>
        <div className="FeedFrndSuggestions">
            {frndSuggestions.map((frnd,index) =>(
                <div className="FeedFrndContainer" key={index}>
                    <div className="FeedFrndDP"> U </div>
                    <div className="FeedFrndDetails">
                        <div className="FeedFrndMainDetails">
                            <div className="FeedFrndUserName" key={index}> @{frnd.uname} </div>
                            <div className="FeedFrndFollowStats" key={index}> {frnd.desc} </div>
                        </div>
                        <div className="FeedFrndFollowBtn"> Follow </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FeedRightContainer