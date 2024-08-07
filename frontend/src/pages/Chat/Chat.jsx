import React, { useState,useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import '../Chat/Chat.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar'
import { useNavigate } from 'react-router-dom';

function Chat({address,socketPort}) {
  // Dark Mode or Light Mode.
  useEffect(()=>{
    if (localStorage.getItem('displayMode')) {
        document.documentElement.style.setProperty('--bg-clr','255,255,255');
        document.documentElement.style.setProperty('--fg-clr','0,0,0');
    }
  })
  // Sockets
  const socket = io.connect(`${address.slice(0,address.lastIndexOf(":"))}:${socketPort}`);
  const [loggedIn,setLoggedIn] = useState(false);
  const [details,setDetails] = useState([]);
  const [room,setRoom] = useState("");
  const handleSend = () => {
      socket.emit("send_message",{sender:details.username,message:msg, time:new Date().toLocaleTimeString(),room:room});
    //   sendMsg(details.username,msg);
  }
  const joinRoom = (reciever) => {
      console.log("joining a room");
      socket.emit("join_room",{user1:details.username,user2:reciever});
  }
  socket.on("add_room",(data) => {
    setRoom(data.room); 
    console.log(data);
    getChat(data.room);
  })

  socket.on("recieve_message",(data)=>{
      sendMsg(data.sender,data.room,data.message,data.time);
  })
  const getChat = (room) => {
      socket.emit("get_chat",{room:room});
      socket.on("recieve_chat",(data) => {
          console.log(data);
          setChatConversation(data);
        })
  }

  // Lame Chat functionality
  const [contacts,setContacts] = useState([]);
  const [contactSearch,setContactSearch] = useState("");
  const [chatConversation,setChatConversation] = useState([]);
  const [chatActive,setChatActive] = useState(false);
  const [reciever,setReciever] = useState("");
  const [msg,setMsg] = useState("");
  const navigation = useNavigate();
  const openChat = async (contact) => {
    console.log("calling from open Chat function");
    joinRoom(contact);
    setReciever(contact);
    setChatActive(true);
  }
  const sendMsg = (sender,room,message,time) => {
    if (message !== "") {
        const conversation = {"sender":sender,"channel":room,"message":message,"time":time};
        setChatConversation((prevState) => ([conversation,...prevState,]));
        setMsg("");
    }
  }
  const searchContact = (event) => {
    event.preventDefault();
    setContactSearch(event.target.value);
  }
  const handleSendMsgKeyPress = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
        handleSend();
    }
  }

  // User login check
  const userLoggedIn = async () => {
    const res = await axios.get(`${address}/user/islogged`,{"withCredentials":true});
    if (res.data["stats"]) {
        setLoggedIn(true);
        getUser();
      } else {
        navigation("/signin?next=profile");
      }
  }
  const getUser = async () => {
      var res = await axios.get(`${address}/user`,{"withCredentials":true});
      setDetails(res.data);
      setContacts(res.data.follows);
  }
  useEffect(() => {
      userLoggedIn();
  },[]);
  // If Sockets are not supported
  if (!process.env.REACT_APP_SOCKETS) {
      return (
          <div className='FeedMainContainer'>
              <FeedLeftNavbar address={address} />
  
              <div className="NoSocketsDisplay">
                  Sockets are not supported in free hostings
              </div>
          </div>
      )
    }
  return (
    <div className='FeedMainContainer'>
        <FeedLeftNavbar address={address} />
        {
            chatActive ? 
            <div className="ChatRightContainer">
                <div className="ChatTop">
                    <div className="ChatBackBtn" onClick={() => {setChatActive(false);}}> Back </div>
                    <a href='/profile' className="ChatRecieverDetails">
                        <div className="ChatRecieverProfile"> A </div>
                        <div className="ChatRecieverUserName"> @{reciever} </div>
                    </a>
                </div>
                <div className="ChatContentContainer">
                <div className="ChatPreviousContent">
                    { (chatConversation!== []) ? 
                    chatConversation.map((chat, index) => {
                        if ((chat.sender === reciever) || (chat.sender === details.username)) {
                        return (
                            <div className="ChatMessagesWrapper" key={index}>
                            {(chat.sender === reciever) && (
                                <div className="messagesRecievedWrapper">
                                    <div className="messagesRecieved" key={index}>
                                        {chat.message}
                                        <div className="messageTime"> {chat.time} </div>
                                    </div>
                                </div>
                            )}
                            {(chat.sender === details.username) && (
                                <div className="messagesSentWrapper">
                                    <div className="messagesSent" key={index}>
                                        {chat.message}
                                        <div className="messageTime"> {chat.time} </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        );
                        } else {
                        return null;
                        }
                    }) : ""}
                </div>

                    <div className="ChatInputContainer">
                        <input className='ChatInputBox' type="text" onInput={(e) => {setMsg(e.target.value);}} onKeyUp={(e)=>{handleSendMsgKeyPress(e)}} value={msg} placeholder='Type your message' />
                        <div className="ChatMsgSendBtn" onClick={() => {handleSend();}}> Send </div>
                    </div>
                </div>
            </div> 
            :
            <div className="ChatMiddleContainer">
                <div className="ChatContactsContainer">
                    <div className="ChatContactHead"> Contacts </div>
                    <input type="text" className="ChatSearchInputBox" placeholder='Search for contacts' value={contactSearch} onInput={(e) => {searchContact(e);}} />
                    {   (contacts !== []) ?
                        contacts.map((contact,index) =>{
                            if (contactSearch === "") {
                                return(
                                <div className="ChatContactItem" key={index} onClick={() => {openChat(contact);}}>
                                    <div className="ChatContactProfile"> A </div>
                                    <div className="ChatContactUserDetails">
                                        <div className="ChatContactUserName"> @{contact} </div>
                                        <div className="ChatContactLastMsg"> There is a last msg. </div>
                                    </div>
                                    <div className="ChatContactUnreadedMsgCount"> 7 </div>
                                </div>
                                );
                            } else if (contact.includes(contactSearch)) {
                                return (
                                <div className="ChatContactItem" key={index} onClick={() => {openChat(contact);}}>
                                    <div className="ChatContactProfile"> A </div>
                                    <div className="ChatContactUserDetails">
                                        <div className="ChatContactUserName"> @{contact} </div>
                                        <div className="ChatContactLastMsg"> There is a last msg. </div>
                                    </div>
                                    <div className="ChatContactUnreadedMsgCount"> 7 </div>
                                </div>
                                );
                            }
                        }) : ""
                    }
                </div>
            </div>
        }
    </div>
  )
}

export default Chat