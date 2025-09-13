// backend/src/app.js
const express = require('express');
const cors = require('cors');
const { validateTitle } = require("./validation");  // Import validateTitle from validation.js

let tasks = [];
let nextId = 1;

const app = express();
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(express.json());  // Parse JSON request bodies

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  if (!validateTitle(req.body.title)) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = { id: nextId++, title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// GET /tasks - Fetch all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// PATCH /tasks/:id - Toggle the 'done' status of a task
app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(x => x.id === id);
  
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (typeof req.body.done === "boolean") {
    task.done = req.body.done;
  }

  res.json(task);  // Return the updated task
});

// Reset function for testing
const _reset = () => {
  tasks = [];
  nextId = 1;
};

module.exports = { app, _reset };
