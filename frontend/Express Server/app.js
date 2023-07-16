const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;


const app = express();
app.use(express.urlencoded({extended:true}));

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
    // if(!err){    
        console.log("Fetching all Threads");
        const thread = await Thread.find({});
        res.send(thread);
    // }else{
    //     console.log("Error gen");
    //     console.log(err);
    //     console.log("Error end");
    // }
})

app.post("/new", async (req,res)=>{
    // if(!err){    
        const newThread = new Thread({
            title : req.body.title,
            content : req.body.content
        });
        await newThread.save();
        console.log("Saved Successfully ");
        res.send(newThread);
    // }else{
    //     console.log(err);
    // }
})




app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
});
