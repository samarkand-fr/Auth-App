const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to generate access token
const generateAccessToken = (id) => {
  return jwt.sign({ UserInfo: { id } }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m', // Set token expiry to 15 minutes
  });
};

// Function to generate refresh token
const generateRefreshToken = (id) => {
  return jwt.sign({ UserInfo: { id } }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d', // Set token expiry to 7 days
  });
};

// User registration endpoint
const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    // Validate input fields
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Check if user already exists
    const foundUser = await User.findOne({ email }).exec();
    if (foundUser) {
      return res.status(401).json({ message: 'User already exists' });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create new user
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
  
    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
  
    // Set refresh token as a cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
    });
  
    // Return access token and user info
    res.json({
      accessToken,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// User login endpoint
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Find user by email
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) {
      return res.status(401).json({ message: 'User does not exist' });
    }
  
    // Compare passwords
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: 'Wrong Password' });
    }
  
    // Generate tokens
    const accessToken = generateAccessToken(foundUser._id);
    const refreshToken = generateRefreshToken(foundUser._id);
  
    // Set refresh token as a cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
    });
  
    // Return access token and user email
    res.json({
      accessToken,
      email: foundUser.email,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Token refresh endpoint
const refresh = async (req, res) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    // Verify and decode refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // Find user by decoded ID
    const foundUser = await User.findById(decoded.UserInfo.id).exec();
    if (!foundUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Generate new access token
    const accessToken = generateAccessToken(foundUser._id);
    res.json({ accessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(403).json({ message: 'Forbidden' });
  }
};

// User logout endpoint
const logout = (req, res) => {
  // Clear the refresh token cookie
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.json({ message: 'Cookie cleared' });
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
