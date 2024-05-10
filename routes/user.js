const express = require("express");
const router = express.Router();
const { loginUser, signupUser } = require("../controllers/userController");

//login route

router.post("/user/login", loginUser);


//sign route

router.post("/user/sign", signupUser);

module.exports = router;
