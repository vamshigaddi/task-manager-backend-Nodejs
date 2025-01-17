const Task = require('../models/Task');
const mongoose = require('mongoose');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  // Log the incoming request body for debugging purposes
  console.log('Request Body:', req.body);

  try {
    // Create a new task associated with the logged-in user
    const task = await Task.create({
      user: req.user.id, // Link the task to the user
      title: req.body.title, // Task title from request body
      description: req.body.description, // Task description from request body
    });

    // Log successful task creation
    console.log('Task created:', task);

    // Respond with the created task and status 201 (Created)
    res.status(201).json(task);
  } catch (error) {
    // Log the error and respond with status 500 (Internal Server Error)
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    // Fetch all tasks associated with the logged-in user
    const tasks = await Task.find({ user: req.user.id });

    // Log the retrieved tasks
    console.log('Retrieved tasks:', tasks);

    // Respond with the tasks and status 200 (OK)
    res.status(200).json(tasks);
  } catch (error) {
    // Log the error and respond with status 500 (Internal Server Error)
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const { id } = req.params; // Get task ID from URL params
  const { title, description, status } = req.body; // Get updated fields from request body

  try {

    // Convert the id to ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID' });
        }
    // Find the task by ID
    const task = await Task.findById(id);

    // Check if the task exists and if the logged-in user is the owner of the task
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    // Update the task fields with the new data (if provided)
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    // Save the updated task to the database
    const updatedTask = await task.save();

    // Log the updated task
    console.log('Task updated:', updatedTask);

    // Respond with the updated task and status 200 (OK)
    res.status(200).json(updatedTask);
  } catch (error) {
    // Log the error and respond with status 500 (Internal Server Error)
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  const { id } = req.params; // Get task ID from URL params

  try {

    // Convert the id to ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID' });
        }

    // Find the task by ID
    const task = await Task.findById(id);

    // Check if the task exists and if the logged-in user is the owner of the task
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

   
    // Instead of task.remove(), use deleteOne() to remove the task from the database
    await Task.deleteOne({ _id: id });

    // Log successful task deletion
    console.log('Task deleted:', id);

    // Respond with a success message and status 200 (OK)
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    // Log the error and respond with status 500 (Internal Server Error)
    console.error('Error deleting task:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };


