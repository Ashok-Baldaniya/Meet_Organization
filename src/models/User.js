const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    token: {
        type: String
    },
    meetings_attended: [{
        type: Schema.Types.ObjectId,
        ref: 'Meeting',
    }]
}, {
    timestamps: true
})

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
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.skey)
        this.token = token;
        this.save()
        return token
    } catch (error) {
        console.log(error);
    }
}

module.exports = new mongoose.model("User", userSchema)