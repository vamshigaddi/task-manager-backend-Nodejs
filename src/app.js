// Import required modules
const express = require('express');
const dotenv = require('dotenv'); // To load environment variables from .env file
const connectDB = require('./config/db'); // MongoDB connection configuration
const userRoutes = require('./routes/userRoutes'); // User-related routes
const taskRoutes = require('./routes/taskRoutes'); // Task-related routes

// Load environment variables from .env file (e.g., JWT_SECRET, MongoDB connection string)
dotenv.config();

// Connect to MongoDB database
connectDB();

// Create an Express application instance
const app = express();

// Middleware to parse JSON request bodies for incoming requests
app.use(express.json()); // This allows us to access req.body in route handlers

// Use user routes for handling authentication, registration, etc.
app.use('/api/users', userRoutes);

// Use task routes for managing tasks
app.use('/api/tasks', taskRoutes);

// Define a test route to check if the server is running
app.get('/', (req, res) => {
  res.send('Task Management Backend is running!');
});

// Start the Express server on a specified port (5000 by default)
const PORT = process.env.PORT || 5000; // Use the port from the environment or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the server start message
});



