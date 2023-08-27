const router = require("express").Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/", getAllUsers);

module.exports = router;
