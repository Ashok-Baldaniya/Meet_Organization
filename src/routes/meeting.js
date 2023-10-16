const router = require("express").Router();

const { createMeeting, updateMeetingResponse, getMeeting, cancelMeeting, getAllMeeting, updateMeeting } = require("../controllers/meetingController");

const auth = require("../middleware/auth");

router.post("/create", auth, createMeeting);
router.put("/update-response/:id", auth, updateMeetingResponse);
router.put("/update/:id", auth, updateMeeting);
router.get("/get/:id", getMeeting);
router.delete("/cancel/:id", auth, cancelMeeting);
router.get("/get-all", getAllMeeting);

module.exports = router;