const express = require('express');
const router = express.Router();


router.get("/",(req,res) => {
    res.send("This is a threads get request");
})


module.exports = router;