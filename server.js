const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  title: String,
  date: Date,
  priority: String,
  assignedTo: String,
});

const Task = mongoose.model('Task', taskSchema);

// CRUD operations

// Create a new task
app.post('/tasks', async (req, res) => {
  const { title, date, priority, assignedTo } = req.body;
  const task = new Task({ title, date, priority, assignedTo });
  await task.save();
  res.send({ message: 'Task successfully created' });
});

// Read all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, priority, assignedTo } = req.body;
  await Task.findByIdAndUpdate(id, { title, date, priority, assignedTo });
  res.send({ message: 'Task successfully updated' });
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.send({ message: 'Task successfully deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
