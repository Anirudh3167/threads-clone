import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Search.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar'

function Search({address}) {
  const [searchInput,setSearchInput] = useState('');
  const [searching,setSearching] = useState(false);
  const [results,setResults] = useState([]);
  const navigation = useNavigate();

  const handleSearch = (event) => {
    console.log(event.target.value)
  }

  // Checking user authentication
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
    <div className='FeedMainContainer'>
        <FeedLeftNavbar address={address} />
        <div className="SearchRightContainer">
            <input type="text" className="InputBox" placeholder='Search here' onChange={(e) => {handleSearch(e)}} />
            {
                searching ? 
                    "searching"
                :
                    "result found"
            }
        </div>
    </div>
  )
}

export default Search