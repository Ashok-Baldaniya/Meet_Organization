const userService = require("../services/userService");

module.exports = {
  userRegister: async (req, res, next) => {
    try {
      const params = { ...req.body, ...req.params };
      const userdata = await userService.userRegister(params);
      res.send(userdata);
    } catch (error) {
      next(error)
    }
  },

  userLogin: async (req, res, next) => {
    try {
      const params = { ...req.body, ...req.params };
      const userToken = await userService.userLogin(params);
      res.json({
        token: userToken,
        message: 'Login successful'
      });
    } catch (error) {
      next(error)
    }
  },

  viewAllUser: async (req, res, next) => {
    try {
      const allUser = await userService.viewAllUser();
      res.json(allUser);
    } catch (error) {
      next(error)
    }
  }
}
