import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import io from 'socket.io-client'
import Webcam from 'react-webcam'


import '../testing/Testing.css'

const socket = io.connect("http://localhost:3001");
function Testing() {
  const [myVideo,setMyVideo] = useState(false);
  const [room,setRoom] = useState("");
  const roomRef = useRef(room);
  // Video Streaming
  const myStream = useRef(null);
  const otherStream = useRef(null);
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("test_join",{room:room});
    }
  }
  useEffect(() => {
    const sendVideo = () => {
      if (myStream.current) {
        const videoData = myStream.current.getScreenshot(); // Get the video frame as base64
        console.log("Video is sending");
        console.log(`Room:${room} , Room Ref:${roomRef.current}`);
        socket.emit('stream', {video : videoData, room : room}); // Send video frame to the server
      }
    };

    const interval = setInterval(sendVideo, 100); // Send frames every 100ms

    return () => {
      clearInterval(interval);
    };
  }, [room,socket]);
  useEffect(() => {

    socket.on('otherStream', (data) => {
      console.log("Recieveing the Video");
      // Update the video element with the received video frame
      otherStream.current.src = `${data.video}`;
    });
  },[socket]);


  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"black",color:"white",width:"100vw",height:"100vh"}}>
    <div className="joinRoomContainer">
      <input type="text" onChange={(e) => {setRoom(e.target.value);}} placeholder='Enter your room id' className='InputBox' />
      <button className='joinBtn' onClick={() => {joinRoom()}}> Join </button>
    </div>
    {/* Myself Video */}
    <div className="VideosContainer">
      <div className="myVideoContainer">
        <div className="showMyVideoBtn" onClick={() => {setMyVideo(!myVideo)}}> {myVideo ? "hide My video" : "Show My Video"} </div>
        { myVideo ? <Webcam ref={myStream} className='videoBox' /> : "" }
      </div>
      <div className="otherVideoContainer">
        {otherStream ? <img  autoPlay ref={otherStream} playsInline className='videoBox' /> : ""}
      </div>
    </div>
    </div>
  )
}

export default Testing