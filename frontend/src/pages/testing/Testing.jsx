import React, { useEffect, useState } from 'react'
import axios from 'axios';
import io from 'socket.io-client'

import '../testing/Testing.css'

const socket = io.connect("http://192.168.29.188:3001");
function Testing() {
  const [sendMsg,setSendMsg] = useState("");
  const [chat,setChat] = useState([]);
  const [recieveMsg,setRecieveMsg] = useState("");
  const [room,setRoom] = useState("");
  const [dataSent,setDataSent] = useState({sendMsg:"",recieveMsg:""});
  const handleSend = () => {
    setDataSent((prevState) => ({...prevState,sendMsg:sendMsg}));
    socket.emit("send_message",{message:sendMsg, room:room});
  }
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room",{room:room});
    }
  }
  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
      console.log(data);
      setDataSent((prevState) => ({...prevState,recieveMsg:data}));
      setRecieveMsg(data);
    })
  },[socket])
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"black",color:"white",width:"100vw",height:"100vh"}}>
    <div className="testingChatContainer">
      <div className="testingChatTop">
        <input type="text" className='testingChatInputBox' placeholder='Message' onInput={(e) => {setSendMsg(e.target.value);}} />
        <button className="testingSendBtn" onClick={() => {handleSend()}}> Send </button>
      </div>
      <div className="testingMessageContainer">
        <div className="testingMessageSent">Message sent :<br /> {dataSent.sendMsg}</div>
        <div className="testingMessageRecieved">Message Recieved : <br /> {dataSent.recieveMsg}</div>
      </div>
      <div className="testingChatTop" style={{position:"absolute",bottom:"10px"}}>
        <input type="text" className='testingChatInputBox' placeholder="Room Number" onInput={(e) => {setRoom(e.target.value);}} />
        <button className="testingSendBtn" onClick={() => {joinRoom()}}> Join </button>
      </div>
    </div>
    </div>
  )
}

export default Testing