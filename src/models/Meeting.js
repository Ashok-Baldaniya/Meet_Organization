const mongoose = require("mongoose")

const { Schema } = mongoose;

const meetingSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    duration: {
        type: Number
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        response: {
            type: String,
            enum: ["accept", "reject", "pending"],
            default: "pending"
        }
    }],
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})
module.exports = new mongoose.model("Meeting", meetingSchema)