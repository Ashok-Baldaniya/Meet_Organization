const mongoose = require("mongoose")

const { Schema } = mongoose;

const notificationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
    },
    type: {
        type: String,
    },
    meeting_id: {
        type: Schema.Types.ObjectId,
        ref: 'Meeting',
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model("Notification", notificationSchema);