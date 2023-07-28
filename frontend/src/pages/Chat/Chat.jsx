import React, { useState,useEffect } from 'react'
import axios from 'axios'

import '../Chat/Chat.css'
import FeedLeftNavbar from '../pageComponents/FeedLeftNavbar'
import { useNavigate } from 'react-router-dom';

function Chat() {
  const sender = "Master";
  const chat_contacts = ["Abc","Bcd","Def","Ultimatum","Tony Stark","Scralet Witch","Hulk","Thor","Captain America"];
  const contact_chat = [{"sender":"Abc","reciever":"Master","message":"This is a message"},
                        {"sender":"Master","reciever":"Abc","message":"This is reply"},
                        {"sender":"Abc","reciever":"Master","message":"This is a message"},
                        {"sender":"Abc","reciever":"Master","message":"This is a message"},
                        {"sender":"Master","reciever":"Abc","message":"Enough Messages"}]
  const [contacts,setContacts] = useState(chat_contacts);
  const [chatConversation,setChatConversation] = useState(contact_chat);
  const [chatActive,setChatActive] = useState(false);
  const [reciever,setReciever] = useState("");
  const [msg,setMsg] = useState("");
  const navigation = useNavigate();
  const openChat = (contact) => {
    setReciever(contact);
    setChatActive(true);
  }
  const sendMsg = () => {
    if (msg !== "") {
        const conversation = {"sender":"Master","reciever":reciever,"message":msg};
        setChatConversation((prevState) => ([conversation,...prevState,]));
        setMsg("");
    }
  }
  const userLoggedIn = async () => {
    const res = await axios.get("http://localhost:8080/user/islogged",{"withCredentials":true});
    if (!res.data["stats"]) {
      navigation("/signin?next=chat");
    }
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
                    {chatConversation.map((chat, index) => {
                        if (chat.sender === reciever || chat.reciever === reciever) {
                        return (
                            <div className="ChatMessagesWrapper" key={index}>
                            {chat.sender === reciever && (
                                <div className="messagesRecievedWrapper">
                                    <div className="messagesRecieved" key={index}>
                                        {chat.message}
                                        <div className="messageTime"> 18:09 PM</div>
                                    </div>
                                </div>
                            )}
                            {chat.reciever === reciever && (
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
                    })}
                </div>

                    <div className="ChatInputContainer">
                        <input className='ChatInputBox' type="text" onInput={(e) => {setMsg(e.target.value);}} value={msg} placeholder='Type your message' />
                        <div className="ChatMsgSendBtn" onClick={() => {sendMsg();}}> Send </div>
                    </div>
                </div>
            </div> 
            :
            <div className="ChatMiddleContainer">
                <div className="ChatContactsContainer">
                    <div className="ChatContactHead"> Contacts </div>
                    {
                        contacts.map((contact,index) =>(
                            <div className="ChatContactItem" key={index} onClick={() => {openChat(contact);}}>
                                <div className="ChatContactProfile"> A </div>
                                <div className="ChatContactUserDetails">
                                    <div className="ChatContactUserName"> @{contact} </div>
                                    <div className="ChatContactLastMsg"> There is a last msg. </div>
                                </div>
                                <div className="ChatContactUnreadedMsgCount"> 7 </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        }
    </div>
  )
}

export default Chat