const meeting = require("../services/meetingService");

module.exports = {

  createMeeting: async (req, res, next) => {
    try {
      const params = { ...req.body, createdBy: req.user._id };
      const createData = await meeting.createMeeting(params);
      return res.json(createData);
    } catch (error) {
      next(error);
    }
  },

  updateMeeting: async (req, res, next) => {
    try {
      const params = { ...req.body, user: req.user._id, ...req.params }
      const updateData = await meeting.updateMeeting(params)
      res.send(data(updateData, "Meeting Updated"));
    } catch (error) {
      next(error)
    }
  },

  viewMeeting: async (req, res, next) => {
    try {
      const params = { ...req.body, ...req.params }
      const viewMeeting = await meeting.viewMeeting(params)
      res.send(data(viewMeeting, "Show Meeting by Id"))
    } catch (error) {
      next(error)
    }
  },

  cancelMeeting: async (req, res, next) => {
    try {
      const params = { ...req.params, user: req.user }
      const deleteMeeting = await meeting.cancelMeeting(params)
      res.send(data(deleteMeeting, "Meeting canceled"))
    } catch (error) {
      next(error)
    }
  },

  viewAllMeeting: async (req, res, next) => {
    try {
      const getMeeting = await meeting.viewAllMeeting()
      res.send(data(getMeeting, "Show All Meetings"))
    } catch (error) {
      next(error)
    }
  },

  updateInvitationStatus: async (req, res, next) => {
    try {
      const params = { ...req.body, ...req.params, user: req.user }
      const updateMeeting = await meeting.updateInvitationStatus(params)
      res.send(data(updateMeeting, "Invitation Status Updated"))
    } catch (error) {
      next(error)
    }
  }
}