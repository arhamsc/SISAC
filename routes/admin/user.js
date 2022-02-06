const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../../controllers/admin/user");

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  userController.signup
);

router.post("/login", userController.login);

router.post("/refreshToken", userController.refreshTokenGeneration);

router.post('/logout', userController.logout);

module.exports = router;
