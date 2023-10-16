const Meeting = require("../models/Meeting")
const User = require("../models/User")

module.exports = {

  createMeeting: async function (params) {
    const Participent = await User.findOne({ username: 'jay' });
    const newMeeting = await Meeting.create({
      title: params.title,
      description: params.description,
      duration: params.duration,
      participants: { userId: Participent._id },
      organizer: params.createdBy,
    });
    await newMeeting.populate({
      path: 'participants.userId',
      select: 'username email-_id'
    });
    const data = {
      $push: { meetings_attended: newMeeting._id }
    }
    await User.findByIdAndUpdate(Participent._id, data);
    return newMeeting;
  },

  updateMeeting: async function (params) {
    const user = await Meeting.findOne({ organizer: params.user });
    if (!user) {
      throw new Error('No Auth user found');
    };
    const updateMeeting = await Meeting.findByIdAndUpdate({ _id: params.id }, params).populate({
      path: 'participants.userId',
      select: 'name email-_id'
    });
    return updateMeeting;
  },

  cancelMeeting: async function (params) {
    const meeting = await Meeting.findOne({ _id: params.id });
    if (!meeting) {
      throw new Error('No meeting found');
    }

    const creator = await User.findOne({ _id: meeting.organizer });
    if (!creator || creator._id.toString() !== params.user._id) {
      throw new Error('Not authorized to access this meeting');
    }

    const participants = meeting.participants;
    for (const participant of participants) {
      const user = await User.findById(participant.userId);
      if (!user) {
        continue;
      }
      user.meetings_attended = user.meetings_attended.filter(
        (meetingId) => meetingId.toString() !== params.id
      );
      await user.save();
    }
    const deleteData = await Meeting.findByIdAndDelete(params.id);
    return deleteData;
  },

  updateMeetingResponse: async function (params) {
    const meeting = await Meeting.findOne({ _id: params.id }).populate({
      path: 'organizer',
      select: 'name email-_id'
    });

    if (!meeting) {
      throw new Error('Meeting not found');
    }
    let flag = false;
    const auth_user_id = params.user._id;

    meeting.participants.forEach(element => {
      let user_Id = element.userId.toString();
      if (user_Id === auth_user_id) {
        flag = true;
        element.response = params.response;
      }
    });
    if (!flag) {
      throw new Error('Not authorized to access');
    }
    await meeting.save();
    return meeting;
  }
}