const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Connecting to the MongoDB database using the provided URI
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Connected to database");
    } catch (error) {
        // Handling any errors that occur during the database connection process
        console.error("Error connecting to database:", error);
    }
}

// Exporting the connectDB function for external use
module.exports = connectDB;
