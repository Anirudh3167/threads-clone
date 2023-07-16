var express = require("express");
var router = express.Router();

router.get("/",function(req,res){
    res.send("{Name:Threads-Clone,Members:[Anirudh,Sanchit,Shubham,Rishabh,Lakshay],About:Very good app}")
});

module.exports = router;