const User = require("../models/User");

// Controller function to get all users
const getAllUsers = async (req, res) => {
  // Query the database to find all users, excluding the password field
  const users = await User.find().select("-password").lean();

  // If no users are found, return a 400 Bad Request response
  if (!users.length) {
    return res.status(400).json({ message: "No users found" });
  }

  // Return the found users in the response
  res.json(users);
};

// Export the controller function
module.exports = {
  getAllUsers,
};
