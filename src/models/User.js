const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    meetings: [{
        type: Schema.Types.ObjectId,
        ref: 'Meeting',
    }]
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10)
            next()
        }
    } catch (error) {
        response.send(error)
    }
})

userSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.skey);
    this.token = token;
    this.save();
    return token;
}

module.exports = new mongoose.model("User", userSchema);