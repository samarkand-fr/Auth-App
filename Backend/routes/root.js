const express = require("express");
const router = express.Router();
const path = require("path");

// Route to serve the index.html file
router.get("/", (req, res) => {
  // Send the index.html file as a response
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// Export the router to be used in other files
module.exports = router;
