const express = require("express");
const router = express.Router();
const useController = require("../controllers/GetJson");
const userController = require("../controllers/userService");
const feedController = require("../controllers/FeedController");

router.get("/getjson", useController.getJson);
router.post("/register-user", userController.registerUser);
router.post("/login", userController.login);
router.get("/get-feed", userController.validateJwt, feedController.getFeed);

module.exports = router;
