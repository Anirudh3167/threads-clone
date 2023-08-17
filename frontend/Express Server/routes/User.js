const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const secretKey = "SecretKey";

const multer  = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../public/images")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage })

mongoose.connect("mongodb+srv://Master:Master@cluster0.9sttlnd.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

mongoose.connection.once("open",()=>{console.log("DataBase Connection Open!")});

const mongoUserSchema = new mongoose.Schema({
    email:String,
    password:String,
    username:String,
    firstname:String,
    lastname:String,
    dob:String,
    bio:String,
    follows:[{type:String}],
    profile:String
});
const UsersCollection = mongoose.model("User", mongoUserSchema);

// ****************************************************
// ALL USER DETAILS
// ****************************************************
router.get("/",async (req,res) => {
    const token = req.cookies.jwtKey;
    
    if (!token) {
        console.log("token is not present");
        return res.status(401).json({ error: 'Unauthorized - Token not found' });
    }

    try {
        const payload = jwt.verify(token, secretKey);
        const email = payload["pay_load"].email;
        const UsersData = await UsersCollection.find({email:email});
        // console.log(UsersData[0]);
        res.send(UsersData[0]);
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
})

router.post("/",upload.single("profile"),async (req,res) => {

    const pay_load = {
        email : req.body.email,
        password : req.body.password,
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        dob : req.body.dob,
        bio : req.body.bio,
        follows : req.body.follows,
        profile : (req.file) ? req.file.filename : null
    }
    console.log(req.body.follows);
    const newUser = new UsersCollection(pay_load);      // Adds the pay_load to mongodb
    await newUser.save();
    console.log("new User Added");
    const token = jwt.sign({pay_load},secretKey,{expiresIn:"3h"});
    res.cookie('jwtKey', token, { httpOnly: true });
    res.json({result:"success"});
})

// ****************************************************
// LOGIN
// ****************************************************

router.post("/login",async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const UsersData = await UsersCollection.find({email:email});
    if (UsersData[0]["password"] === password) {
        var pay_load = UsersData[0];
        const token = jwt.sign({pay_load},secretKey,{expiresIn:"3h"});
        res.cookie('jwtKey', token, { httpOnly: true });
        res.json({result:"success"});
    } else {
        res.json({result:"request failed",remarks:"Invalid credentials"})
    }
})

// ****************************************************
// LOGOUT
// ****************************************************
router.post("/logout",(req,res) => {
    for (var key in req.cookies) {
        // console.log("Blacklisting:\n\t" + key + ":\t" + req.cookies[key]);
        const token = jwt.sign({"terminate":true},secretKey,{expiresIn:"0s"});
        res.cookie(key, token, { httpOnly: true });
        res.json({result:"success"});
    }
})

// ****************************************************
// USER IS LOGGED?
// ****************************************************
router.get("/islogged",(req,res) => {
    const token = req.cookies.jwtKey;
    
    if (!token) {
        res.json({"stats":false})
    }
    try {
        const payload = jwt.verify(token, secretKey);
        res.json({"stats":true});
    } catch (err) {
        return res.json({"stats":false})
    }
    
})

// ****************************************************
// OTHER USER DETAILS
// ****************************************************
router.get("/getUser/:username",async (req,res) => {
    const username = req.params.username;
    const UsersData = await UsersCollection.find({username:username});
    try {

        const response = {
            status : "ok",
            username : UsersData[0].username,
            firstname : UsersData[0].firstname,
            lastname : UsersData[0].lastname,
            bio : UsersData[0].bio,
            profile : UsersData[0].profile
        }
        res.json(response);
    } catch(e) {
        res.json({status:"Invalid user"});
    }
})

// ****************************************************
// USER FOLLOWS
// ****************************************************
router.post("/setFollows",async (req,res) => {
    console.log("request recieved");
    const follows = req.body.follows;
    console.log(follows);
    const token = req.cookies.jwtKey;
    
    if (!token) {
        return res.json({"stats":false})
    }
    try {
        const payload = jwt.verify(token, secretKey);
        const username = payload.pay_load.username;
        const UserData = await UsersCollection.updateOne(
            {username:username},
            {$set : {follows:follows}}
        );
        res.json({stats : true});
    } catch (err) {
        return res.json({"stats":false})
    }
})

// ****************************************************
// SEARCH USERS
// ****************************************************
router.get("/search", async (req,res) => {
    const search = req.query.query;
    const resp = await UsersCollection.find({ 
        $or : [
            {username: { $regex: `.*${search}.*`, $options: 'i' } },
            {firstname: { $regex: `.*${search}.*`, $options: 'i' }},
            {lastname: { $regex: `.*${search}.*`, $options: 'i' }}
        ]
    });
    res.json({status:true, users : resp})
})

module.exports = router;