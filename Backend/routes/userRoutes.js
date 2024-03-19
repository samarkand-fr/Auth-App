const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");

// Apply verifyJWT middleware to all routes in this router
router.use(verifyJWT);

// Define route to handle GET requests to root endpoint ("/")
router.route("/").get(usersController.getAllUsers);

// Export the router to be used in other files
module.exports = router;
