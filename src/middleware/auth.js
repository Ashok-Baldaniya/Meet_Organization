const User = require("../models/User")
const jwt = require("jsonwebtoken")


const auth = async function (req, res, next) {
    try {

        const token = req.headers.authorization;

        const userInfo = await jwt.verify(token, process.env.skey);
        const valid = await User.find({ _id: userInfo._id })
        if (valid.length) {
            req.user = userInfo
            next()
        }
        else {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}
module.exports = auth