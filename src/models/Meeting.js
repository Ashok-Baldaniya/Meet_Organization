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
        type: Date,
        default: new Date().toISOString()
    },
    duration: {
        type: Number,
        default: 30,
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        response: {
            type: String,
            enum: ['accept', 'reject', 'pending'],
            default: "pending"
        }
    }],
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model("Meeting", meetingSchema);