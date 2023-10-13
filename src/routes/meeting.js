const router = require("express").Router();

const { createMeeting, updateInvitationStatus, getMeeting, cancelMeeting, getAllMeeting, updateMeeting } = require("../controllers/meetingController");

const auth = require("../middleware/auth");

router.post("/create", auth, createMeeting);
router.put("/update_invitation/:id", updateInvitationStatus);
router.put("/update/:id", auth, updateMeeting);
router.get("/get/:id", getMeeting);
router.delete("/cancel/:id", cancelMeeting);
router.get("/get-all", getAllMeeting);

module.exports = router;