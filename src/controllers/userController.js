const User = require('../models/User');
const userService = require("../services/userService");

module.exports = {
  async userRegister(req, res, next) {
    const params = { ...req.body, ...req.params };
    const userdata = await userService.userRegister(params);
    return res.json(userdata);
  },

  async userLogin(req, res, next) {
    const params = { ...req.body, ...req.params };
    const userToken = await userService.userLogin(params);
    return res.json({ token: userToken });
  },

  async getAllUser(req, res, next) {
    const allUser = await userService.getAllUser();
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
