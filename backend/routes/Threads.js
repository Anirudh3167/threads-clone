const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const secretKey = "SecretKey";

const multer  = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage })

const mongoThreadSchema = new mongoose.Schema({
    id : String,
    username : String,
    message : {
        text : String,
        image : [String]
    },
    time : String,
    replies : [{type:String}]
});
const ThreadsCollection = mongoose.model("Thread", mongoThreadSchema);

router.get("/", async (req,res) => {
        const threadAggreagation = ThreadsCollection.aggregate([{$sort:{ time: -1 }},{$limit:20}]);
        const threads = await threadAggreagation;
        if (threads) {
            res.json({stats:true,threadsData:threads});
        } else {
            res.json({stats:false});
        }
    })

router.post("/",upload.array("image"), async (req,res) => {
    console.log("Files:");
    console.log(req.files);
     const data = {
        id : `${req.body.time}_${req.body.username}`,       // Id will be the timestamp + username
        username : req.body.username,
        message : {
            text : req.body["message_text"],
            image : (req.files ? req.files.map((file) => file.filename) : [])
        },
        time : req.body.time,
        replies : req.body.replies
    }
    console.log("data:");
    console.log(data);
    const thread = new ThreadsCollection(data);
    const resp = await thread.save();
    if (resp) {
        res.json({stats:true,images:data.message.image});
    } else {
        res.json({stats:false});
    }
})

// ##########################################################
// THREADS SEARCH
// ##########################################################
router.get('/search', async (req,res) => {
    const search = req.query.query;
    const resp = await ThreadsCollection.find({ 
        $or : [
            { "message.text" : { $regex: `.*${search}.*`, $options: 'i' } },
        ]
    });
    res.json({status:true, threads : resp})
})

// ###########################################################
// USER THREADS
// ###########################################################
router.get('/get-user-threads', async (req,res) => {
    const username = req.query.username;
    const resp = await ThreadsCollection.find({
        $or : [
            { username : username},
        ]
    })
    res.json({status:true,threads : resp})
})
module.exports = router;