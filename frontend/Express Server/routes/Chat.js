const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const http = require('http');
const app = express();

// sockets
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server,{cors:{
    origin : "*",
    methods : ["GET","POST"],
}})
server.listen(3001, () => {console.log("Socket server started");})
io.on("connection",(socket) => {
    // Leaving the room is not defined.
    socket.on("join_room", (data) => {
        socket.join(data.room);
        console.log(`${socket.id} -> Room : ${data.room}`)
    })
    socket.on("send_message",(data) => {
        console.log(`Room : ${data.room} \t ${socket.id}:${data.message}`);
        socket.to(data.room).emit("recieve_message",data);
    })
})


router.get("/",(req,res) => {
    res.json({content:"You are requesting the chat GET method"})
})

module.exports = router;