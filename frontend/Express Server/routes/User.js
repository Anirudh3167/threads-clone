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
        profile : (req.file) ? req.file.filename : null
    }
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
        const pay_load = UsersData[0];
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
module.exports = router;

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