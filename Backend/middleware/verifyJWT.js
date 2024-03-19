const jwt = require("jsonwebtoken");

// Middleware function to verify JWT tokens
const verifyJWT = (req, res, next) => {
  // Extract the token from the authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // Check if the authorization header is missing or doesn't start with "Bearer "
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Extract the token from the authorization header
  const token = authHeader.split(" ")[1]; // ["Bearer","token"]

  // Verify the JWT token 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // If there's an error, return a 403 Forbidden response
    if (err) return res.status(403).json({ message: "Forbidden" });

    // Attach the user ID from the decoded token to the request object
    req.user = decoded.UserInfo.id;

    // Call the next middleware function
    next();
  });
};

// Export the middleware function
module.exports = verifyJWT;
