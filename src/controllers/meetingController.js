const meetingService = require("../services/meetingService");
const Meeting = require('../models/Meeting');

module.exports = {

  async createMeeting(req, res, next) {
    const params = { ...req.body, createdBy: req.user._id };
    const createData = await meetingService.createMeeting(params);
    return res.json(createData);
  },

  async updateMeeting(req, res, next) {
    const params = { ...req.body, user: req.user._id, ...req.params };
    const updateData = await meetingService.updateMeeting(params);
    return res.json(updateData);
  },

  async getMeeting(req, res, next) {
    const { id } = req.params;
    const meeting = await Meeting.findOne({ _id: id }).populate({
      path: 'organizer',
      select: 'name email-_id'
    }).populate({
      path: 'participants.userId',
      select: 'name email-_id'
    });
    return res.json(meeting);
  },

  async cancelMeeting(req, res, next) {
    const params = { ...req.params, user: req.user };
    const deletedMeeting = await meetingService.cancelMeeting(params);
    return res.json(deletedMeeting);
  },

  async getAllMeeting(req, res, next) {
    const allMeeting = await Meeting.find().populate('participants.userId', 'username email-_id').populate('organizer', 'username email-_id');
    return res.json(allMeeting);
  },

  async updateMeetingResponse(req, res, next) {
    const params = { ...req.body, ...req.params, user: req.user };
    const updatedResponse = await meetingService.updateMeetingResponse(params);
    return res.json(updatedResponse);
  }
}