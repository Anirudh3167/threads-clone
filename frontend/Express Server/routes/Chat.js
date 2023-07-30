const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const http = require('http');
const app = express();

const jwt = require('jsonwebtoken');
const secretKey = "SecretKey";

// sockets
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server,{cors:{
    origin : "*",
    methods : ["GET","POST"],
}})
server.listen(3001, () => {console.log("Socket server started");})
io.on("connection",(socket) => {
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    // Leaving the room is not defined.
    socket.on("join_room", async (data) => {
        const username = data.user1;
        const user = data.user2;
        console.log(`Establishing connection for ${user} and ${username}`)
        const Sockets = await socketChannels.find({
            $or : [
                { user1: user , user2: username },
                { user2: user , user1: username }
            ]
        });
        if (Sockets.length !== 0) {
            const room = Sockets[0]["_id"].toString();
            socket.join(room);
            console.log(`joined room ${room}`);
            socket.emit("add_room",{room:room});
        }
    })
    socket.on("send_message",(data) => {
        console.log(`Room : ${data.room} \t ${data.sender}:${data.message}`);
        socket.to(data.room).emit("recieve_message",data);
    })
})

// Mongoose Connection
mongoose.connect("mongodb+srv://Master:Master@cluster0.9sttlnd.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

mongoose.connection.once("open",()=>{console.log("DataBase Connection Open!")});

const mongoSocketChannelsSchema = new mongoose.Schema({
    user1 : String,
    user2 : String,
});
const socketChannels = mongoose.model("socketChannels", mongoSocketChannelsSchema);



router.get("/",(req,res) => {
    res.json({content:"You are requesting the chat GET method"})
})

router.post("/createRoom", async (req,res) => {
    const user = req.body.user;
    const token = req.cookies.jwtKey;
    
    if (!token) {
        console.log("token is not present");
        return res.status(401).json({ error: 'Unauthorized - Token not found' });
    }

    try {
        const payload = jwt.verify(token, secretKey);
        const username = payload["pay_load"].username;
        console.log("creating a socket room for " + username);
        const Sockets = await socketChannels.find({
            $or : [
                { user1: user , user2: username },
                { user2: user , user1: username }
            ]
        });
        if (Sockets.length === 0) {
            try {

                const resp = new socketChannels({
                    user1:username,
                    user2:user
                });
                const newRoom = await resp.save();
            } catch (err) {
                console.log("Error in creating the room");
                console.log(err.message);
            }
        } else {console.log(`Socket already exists for ${user} and ${username}`)}
        return res.send("success");
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
})

module.exports = router;