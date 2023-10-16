const meetingService = require("../services/meetingService");
const Meeting = require('../models/Meeting');

module.exports = {

  createMeeting: async (req, res, next) => {
    try {
      const params = { ...req.body, createdBy: req.user._id };
      const createData = await meetingService.createMeeting(params);
      return res.json(createData);
    } catch (error) {
      next(error);
    }
  },

  updateMeeting: async (req, res, next) => {
    try {
      const params = { ...req.body, user: req.user._id, ...req.params };
      const updateData = await meetingService.updateMeeting(params);
      return res.json(updateData);
    } catch (error) {
      next(error);
    }
  },

  getMeeting: async (req, res, next) => {
    try {
      const { id } = req.params;
      const meeting = await Meeting.findOne({ _id: id }).populate({
        path: 'organizer',
        select: 'name email-_id'
      }).populate({
        path: 'participants.userId',
        select: 'name email-_id'
      });
      return res.json(meeting);
    } catch (error) {
      next(error);
    }
  },

  cancelMeeting: async (req, res, next) => {
    try {
      const params = { ...req.params, user: req.user };
      const deletedMeeting = await meetingService.cancelMeeting(params);
      return res.json(deletedMeeting);
    } catch (error) {
      next(error);
    }
  },

  getAllMeeting: async (req, res, next) => {
    try {
      const allMeeting = await Meeting.find().populate('participants.userId', 'username email-_id').populate('organizer', 'username email-_id');
      return res.json(allMeeting);
    } catch (error) {
      next(error);
    }
  },

  updateMeetingResponse: async (req, res, next) => {
    try {
      const params = { ...req.body, ...req.params, user: req.user };
      const updatedResponse = await meetingService.updateMeetingResponse(params);
      return res.json(updatedResponse);
    } catch (error) {
      next(error);
    }
  }
}