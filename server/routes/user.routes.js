const router = require("express").Router();
const {
  userRegister,
  loginUser,
  getALLUsers,
} = require("../controllers/user.controller");

router.post("/login", loginUser);
router.post("/register", userRegister);
router.get("/", getALLUsers);

module.exports = router;
