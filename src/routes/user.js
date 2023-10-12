const router = require("express").Router();

const { userRegister, userLogin, viewAllUser } = require("../controllers/userController");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/get-all-user", viewAllUser);

module.exports = router;
