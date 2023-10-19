const express = require("express");
const router = express();


router.get('/',(req,res)=>{
    res.json('-------------------success--------------------');
});

const userRoute = require("./user");
router.use("/api/user", userRoute);

const meetingRoute = require("./meeting");
router.use("/api/meeting", meetingRoute);

module.exports = router
