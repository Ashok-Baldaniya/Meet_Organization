const User = require('../models/User');
const userService = require("../services/userService");

module.exports = {
  async userRegister(req, res, next) {
    try {
      const params = { ...req.body, ...req.params };
      const userdata = await userService.userRegister(params);
      return res.json(userdata);
    } catch (error) {
      next(error);
    }
  },

  async userLogin(req, res, next) {
    try {
      const params = { ...req.body, ...req.params };
      const userToken = await userService.userLogin(params);
      return res.json({ token: userToken });
    } catch (error) {
      next(error);
    }
  },

  async getAllUser(req, res, next) {
    try {
      const allUser = await userService.getAllUser();
      return res.json(allUser);
    } catch (error) {
      next(error);
    }
  },

  async removeUser(req, res, next) {
    try {
      const { id } = req.params;
      const deletedUser = await userService.removeUser(id);
      return res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  },

  async getSingleUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  },
}
