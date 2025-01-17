const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Associates the task with a specific user
  },
  title: {
    type: String,
    required: [true, 'Please add a task title'],
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending', // Default status
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Task', taskSchema);



