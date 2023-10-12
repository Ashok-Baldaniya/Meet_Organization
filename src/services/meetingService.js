const Meeting = require("../models/Meeting")
const User = require("../models/User")

module.exports = {

  createMeeting: async function (params) {
    const addMeeting = new Meeting(params);
    addMeeting.populate({
      path: 'invitations.userId',
      select: 'name email-_id'
    })
    await addMeeting.save()
    return addMeeting;
  },

  updateMeeting: async function (params) {
    const user = await Meeting.findOne({ createdBy: params.user })
    if (user) {
      const updateMeeting = await Meeting.findByIdAndUpdate({ _id: params.id }, params).populate({
        path: 'invitations.userId',
        select: 'name email-_id'
      })
      return updateMeeting
    }
  },

  viewMeeting: async function (params) {
    const viewData = await Meeting.findOne({ _id: params.id }).populate({
      path: 'createdBy',
      select: 'name email -_id'
    }).populate({
      path: 'invitations.userId',
      select: 'name email-_id'
    })
    return viewData
  },

  cancelMeeting: async function (params) {
    const user = await Meeting.findOne({ createdBy: params.user })
    if (user) {
      const deleteData = await Meeting.findByIdAndDelete({ _id: params.id }).populate({
        path: 'invitations.userId',
        select: 'name email-_id'
      })
      return deleteData
    }
  },

  viewAllMeeting: async function () {
    const getAllData = await Meeting.find().populate({
      path: 'createdBy',
      select: 'name email -_id'
    }).populate({
      path: 'invitations.userId',
      select: 'name email-_id'
    })
    if (getAllData.length != 0) {
      return getAllData
    }
  },

  updateInvitationStatus: async function (params) {
    const updateData = await Meeting.findOne({ _id: params.id }).populate({
      path: 'createdBy',
      select: 'name email -_id'
    })
    const id = params.user._id;
    let flag = false;
    updateData["invitations"].forEach(element => {
      let elementId = element.userId;
      elementId = elementId.toString();
      if (elementId === id) {
        element.status = params.status
        flag = true
      }
    });
    if (flag) {
      updateData.save()
      return updateData
    }
    else {
      throw new Error("user Id not found")
    }
  }
}