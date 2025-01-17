const express = require('express');
const {
  createTask,  // Controller to handle creating a new task
  getTasks,    // Controller to handle fetching all tasks for the user
  updateTask,  // Controller to handle updating a specific task
  deleteTask,  // Controller to handle deleting a specific task
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware'); // Middleware to protect routes (authentication)
const router = express.Router();

// Route to handle tasks
// POST /api/tasks - Create a new task
// GET /api/tasks  - Retrieve all tasks for the authenticated user
router.route('/')
  .post(protect, createTask) // Protect this route and then create a new task
  .get(protect, getTasks);   // Protect this route and then fetch tasks for the logged-in user

// Route to handle specific task actions
// PUT /api/tasks/:id  - Update a task by ID
// DELETE /api/tasks/:id - Delete a task by ID
router.route('/:id')
  .put(protect, updateTask)   // Protect this route and then update the task by ID
  .delete(protect, deleteTask); // Protect this route and then delete the task by ID

module.exports = router;




