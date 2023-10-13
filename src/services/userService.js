const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  userRegister: async (params) => {
    const user = await User.findOne({ email: params.email });
    if (user) {
      throw new Error('User with email address already registered');
    }
    const data = await User.create(params);
    return data;
  },

  userLogin: async (params) => {
    const user = await User.findOne({ email: params.email });
    const isvalid = await bcrypt.compare(params.password, user.password);
    if (isvalid) {
      const token = await user.generateToken();
      return token;
    }
  },

  getAllUser: async () => {
    const allUser = await User.find();
    if (!allUser || allUser.length === 0) {
      throw new Error('No user found, Please Register First');
    }
    return allUser;
  },

  removeUser: async (id) => {
    const user = await User.findById(id);
    if (user) {
      await User.deleteOne({ _id: id });
      return user;
    }
    throw new Error('No user found with given Id');
  },
}