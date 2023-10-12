const express = require("express");
const router = express();

const userRoute = require("./user");
router.use("/api/user", userRoute);

const meetingRoute = require("./meeting");
router.use("/api/meeting", meetingRoute);

// const notificationRoute = require("./notification");
// router.use("/api/notification", notificationRoute);

module.exports = router
