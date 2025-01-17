const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes that require authentication
const protect = async (req, res, next) => {
  let token;

  
  // Check if the authorization header is present and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the 'Authorization' header
      token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token); // Log the extracted token for debugging purposes

      // Verify the token using the JWT_SECRET from the environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user associated with the decoded token and attach to the request object
      req.user = await User.findById(decoded.id).select('-password'); // Exclude password field
      console.log('Authenticated User:', req.user); // Log the authenticated user for debugging purposes

      // Allow the request to proceed to the next middleware/route handler
      next();
    } catch (error) {
      // Log the error message if token verification fails or any other error occurs
      console.error('Authentication Error:', error.message);
      res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
  } else {
    // If no token is found in the authorization header
    console.error('Authentication Error: No token found');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };



