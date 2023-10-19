const User = require('../models/User');
const userService = require("../services/userService");

module.exports = {
  async userRegister(req, res, next) {
    try {
      const params = { ...req.body, ...req.params };
      const userdata = await userService.userRegister(params);
      return res.json(userdata);
    } catch (error) {
      return res.status(500).json(error);
      }
  },

  async userLogin(req, res, next) {
    const params = { ...req.body, ...req.params };
    const userToken = await userService.userLogin(params);
    return res.json({ token: userToken });
  },

  async getAllUser(req, res, next) {
    const allUser = await User.find().populate('meetings');
    if (!allUser || allUser.length === 0) {
      throw new Error('No user found, Please Register First');
    }
    return res.json(allUser);
  },

  async removeUser(req, res, next) {
    const { id } = req.params;
    const deletedUser = await userService.removeUser(id);
    return res.json(deletedUser);
  },

  async getSingleUser(req, res, next) {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    return res.json(user);
  }
}
