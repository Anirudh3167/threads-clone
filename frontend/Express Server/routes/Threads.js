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
module.exports = router;