// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/dbConnect");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// Import CORS options
const corsOptions = require("./config/corsOptions");

// Define the port number
const PORT = process.env.PORT || 5000;

// Connect to the MongoDB database
connectDB();

// Middleware setup
app.use(cors(corsOptions)); // Apply CORS with options
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies

// Serve static files from the "public" directory
app.use("/", express.static(path.join(__dirname, "public")));

// Define routes
app.use("/", require("./routes/root")); // Root route
app.use("/auth", require("./routes/authRoutes")); // Authentication routes
app.use("/users", require("./routes/userRoutes")); // User routes

// Handle 404 errors
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Start the server when MongoDB connection is open
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Log MongoDB connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
