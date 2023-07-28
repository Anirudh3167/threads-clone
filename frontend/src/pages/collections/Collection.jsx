import React, { useState,useEffect } from 'react'
import axios from 'axios'

import '../collections/Collection.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar'
import FeedRightContainer from '../pageComponents/FeedRightContainer'
import { useNavigate } from 'react-router-dom'

function Collection() {
  const collection_names = ["collect_1","funny","serious","ntg"];
  const [collections,setCollections] = useState(collection_names);
  const [newCollection,setNewCollection] = useState(false);
  const [createCollectionName,setCreateCollectionName] = useState('');
  const navigation = useNavigate();
  const addCollection = (event) => {
    event.preventDefault();
    if (createCollectionName !== "") {
        setCollections((collection) => [createCollectionName,...collection]);
    }
    setNewCollection(false);
  }
  const userLoggedIn = async () => {
    const res = await axios.get("http://localhost:8080/user/islogged",{"withCredentials":true});
    if (!res.data["stats"]) {
      navigation("/signin?next=collections");
    }
  }
  useEffect(() => {
      userLoggedIn();
  },[]);
  return (
    <div className='FeedMainContainer'>
        <FeedLeftNavbar />
        <div className="CollectionsMiddleContainer">
            <div className="CollectionContainer">
                <div className="NewCollectionBox" onClick={() => {setNewCollection(!newCollection)}}>
                    <div className="NewCollectionVLine"></div>
                    <div className="NewCollectionHline"></div>
                    New
                </div>
                {
                    newCollection ? 
                    <div className="CreateCollectionContainer">
                        <input className='CreateCollectionInput' type="text" placeholder='collection Name' onInput={(e) => {setCreateCollectionName(e.target.value);}} />
                        <div className="CreateCollectionBtns">
                            <div className="CollectionCancelBtn" onClick={() => {setNewCollection(false);}}> Cancel </div>
                            <div className="CollectionSaveBtn" onClick={(e) => {addCollection(e)}}> Save </div>
                        </div>
                    </div> : ""
                }
                {
                    collections.map((collection,index) => (
                        <div className="CollectionBox" key={index}> {collection} </div>
                        ))
                }
            </div>
        </div>
        <FeedRightContainer />
    </div>
  )
}

export default Collection