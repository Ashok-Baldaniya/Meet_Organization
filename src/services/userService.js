const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  async userRegister(params) {
    try {
      const user = await User.findOne({ email: params.email });
      if (user) {
        throw new Error('User with email address already registered');
      }
      const data = await User.create(params);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async userLogin(params) {
    try {
      const user = await User.findOne({ email: params.email });
      const isvalid = await bcrypt.compare(params.password, user.password);
      if (isvalid) {
        const token = await user.generateToken();
        return token;
      }
    } catch (error) {
      throw new Error(error);
    }
  },

  async getAllUser() {
    try {
      const allUser = await User.find().populate('meetings');
      if (!allUser || allUser.length === 0) {
        throw new Error('No user found, Please Register First');
      }
      return allUser;
    } catch (error) {
      throw new Error(error);
    }
  },

  async removeUser(id) {
    try {
      const user = await User.findById(id);
      if (user) {
        await User.deleteOne({ _id: id });
        return user;
      }
      throw new Error('No user found with given Id');
    } catch (error) {
      throw new Error(error);
    }
  }
};