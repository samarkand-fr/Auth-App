const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Define routes for registering, logging in, refreshing tokens, and logging out
router.route("/register").post(authController.register); // Route for user registration
router.route("/login").post(authController.login); // Route for user login
router.route("/refresh").get(authController.refresh); // Route for refreshing access tokens
router.route("/logout").post(authController.logout); // Route for user logout

// Export the router to be used in other files
module.exports = router;
