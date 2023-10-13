const router = require("express").Router();

const { createMeeting, updateInvitationStatus, viewMeeting, cancelMeeting, viewAllMeeting, updateMeeting } = require("../controllers/meetingController");

const auth = require("../middleware/auth");

router.post("/create", auth, createMeeting);
router.put("/update_invitation/:id", updateInvitationStatus);
router.put("/update/:id", updateMeeting);
router.get("/view/:id", viewMeeting);
router.delete("/cancel/:id", cancelMeeting);
router.get("/view_all", viewAllMeeting);

module.exports = router;