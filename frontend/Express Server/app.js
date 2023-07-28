const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8080;
const cors = require("cors");
const secretKey = "secretKey";

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use(cookieParser());
app.use('/public',express.static('../public'));

const userRouter = require("./routes/User");
const threadsRouter = require("./routes/Threads");
const chatSockets = require("./routes/Chat");
app.use('/user',userRouter);
app.use('/thread',threadsRouter);
app.use('/chat',chatSockets);

mongoose.connect("mongodb+srv://Master:Master@cluster0.9sttlnd.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

mongoose.connection.once("open",()=>{console.log("DataBase Connection Open!")});

const threadSchema = new mongoose.Schema({
    title:String,
    content:String
});
const Thread = mongoose.model("Thread", threadSchema);

app.get("/", async (req,res)=>{

        console.log("Fetching all Threads");
        const thread = await Thread.find({});
        res.send(thread);

})

app.post("/new", async (req,res)=>{
   
        const newThread = new Thread({
            title : req.body.title,
            content : req.body.content
        });
        await newThread.save();
        console.log("Saved Successfully ");
        res.send(newThread);
})

// ***************************************
// Testing Type URL
// ***************************************

app.post("/hello-World/:id/:part",(req,res) => {
    const pay_load = {
        id:req.params.id,
        part:req.params.part
    }
    const token = jwt.sign({pay_load},secretKey,{expiresIn:"3h"});
    // Set the token as an HTTP-only cookie
    res.cookie('jwt', token, { httpOnly: false });

    res.json({result:"success"});
    // res.send(`Hello World with id:${req.params.id} with part:${req.params.part}`);
})

app.post('/login', (req, res) => {
    const payload = {
      username: req.body.username,
      password: req.body.password,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '3h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ result: 'success' });
  });

app.get("/get-details",(req,res) => {
    const token = req.cookies.jwt;
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not found' });
    }

    try {
        const payload = jwt.verify(token, secretKey);
        res.json(payload);
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
})

function verifyToken(req,res,next) {
    const bearerHeaders = req.headers['authorization'];
    if (typeof bearerHeaders !== 'undefined') {
        const bearer = bearerHeaders.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.send({
            result : "Token doesnt exist"
        })
    }
}

app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
});
