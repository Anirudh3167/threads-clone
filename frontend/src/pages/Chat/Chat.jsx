import React, { useState,useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

import '../Chat/Chat.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar'
import { useNavigate } from 'react-router-dom';

function Chat() {
  // Sockets
  const socket = io.connect("http://192.168.29.188:3001");
  const [loggedIn,setLoggedIn] = useState(false);
  const [details,setDetails] = useState([]);
  const room = 512;
  const handleSend = () => {
      socket.emit("send_message",{sender:details.username,message:msg, room:room});
      sendMsg(details.username,reciever,msg);
  }
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room",{room:room});
    }
  }
  useEffect(()=>{joinRoom();},[])
  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
        if (data.sender === reciever) {
            console.log(data.message);
            sendMsg(reciever,details.username,data.message);
        }
    })
  },[socket])


  // Lame Chat functionality
  const [contacts,setContacts] = useState([]);
  const [chatConversation,setChatConversation] = useState([]);
  const [chatActive,setChatActive] = useState(false);
  const [reciever,setReciever] = useState("");
  const [msg,setMsg] = useState("");
  const navigation = useNavigate();
  const openChat = (contact) => {
    setReciever(contact);
    setChatActive(true);
  }
  const sendMsg = (sender,reciever,message) => {
    if (message !== "") {
        const conversation = {"sender":sender,"reciever":reciever,"message":message};
        setChatConversation((prevState) => ([conversation,...prevState,]));
        setMsg("");
    }
  }

  // User login check
  const userLoggedIn = async () => {
    const res = await axios.get("http://localhost:8080/user/islogged",{"withCredentials":true});
    if (res.data["stats"]) {
        setLoggedIn(true);
        getUser();
      } else {
        navigation("/signin?next=profile");
      }
  }
  const getUser = async () => {
      const res = await axios.get("http://localhost:8080/user",{"withCredentials":true});
      setDetails(res.data);
      setContacts(res.data.follows);
  }
  useEffect(() => {
      userLoggedIn();
  },[]);
  return (
    <div className='FeedMainContainer'>
        <FeedLeftNavbar />
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
                        if ((chat.sender === reciever && chat.reciever === details.username) || (chat.reciever === reciever && chat.sender === details.username)) {
                        return (
                            <div className="ChatMessagesWrapper" key={index}>
                            {(chat.sender === reciever && chat.reciever === details.username) && (
                                <div className="messagesRecievedWrapper">
                                    <div className="messagesRecieved" key={index}>
                                        {chat.message}
                                        <div className="messageTime"> 18:09 PM</div>
                                    </div>
                                </div>
                            )}
                            {(chat.reciever === reciever && chat.sender === details.username) && (
                                <div className="messagesSentWrapper">
                                    <div className="messagesSent" key={index}>
                                        {chat.message}
                                        <div className="messageTime"> 18:09 PM</div>
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
                        <input className='ChatInputBox' type="text" onInput={(e) => {setMsg(e.target.value);}} value={msg} placeholder='Type your message' />
                        <div className="ChatMsgSendBtn" onClick={() => {handleSend();}}> Send </div>
                    </div>
                </div>
            </div> 
            :
            <div className="ChatMiddleContainer">
                <div className="ChatContactsContainer">
                    <div className="ChatContactHead"> Contacts </div>
                    {   (contacts !== []) ?
                        contacts.map((contact,index) =>(
                            <div className="ChatContactItem" key={index} onClick={() => {openChat(contact);}}>
                                <div className="ChatContactProfile"> A </div>
                                <div className="ChatContactUserDetails">
                                    <div className="ChatContactUserName"> @{contact} </div>
                                    <div className="ChatContactLastMsg"> There is a last msg. </div>
                                </div>
                                <div className="ChatContactUnreadedMsgCount"> 7 </div>
                            </div>
                        )) : ""
                    }
                </div>
            </div>
        }
    </div>
  )
}

export default Chat