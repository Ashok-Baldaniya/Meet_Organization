const router = require("express").Router();

const { userRegister, userLogin, getAllUser, removeUser, getSingleUser } = require("../controllers/userController");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/get-all-user", getAllUser);
router.get('/get-single-user/:id', getSingleUser);
router.delete("/remove-user/:id", removeUser);

module.exports = router;
