// Importing allowedOrigins array from a separate file
const allowedOrigins = require("./allowedOrigins");

// CORS options configuration
const corsOptions = {
  // Origin validation function
  origin: (origin, callback) => {
    // Check if the request origin is in the allowedOrigins array or if it's null (e.g., same-origin requests)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // If the origin is allowed or it's null, allow the request
      callback(null, true);
    } else {
      // Otherwise, deny the request with an error message
      callback(new Error("Not allowed by CORS"));
    }
  },
  // Allowing credentials to be sent with the request
  credentials: true,
  // Setting the success status code for preflight OPTIONS requests to 200
  optionsSuccessStatus: 200,
};

// Exporting the CORS options configuration
module.exports = corsOptions;
