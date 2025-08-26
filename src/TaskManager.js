// frontend/src/components/TaskManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [newTaskTitle, setNewTaskTitle] = useState(''); // State for new task title

  // Fetch tasks from the backend API
  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:4000/tasks');
    setTasks(response.data); // Update tasks with fetched data
  };

  // Add a new task
  const addTask = async () => {
    if (newTaskTitle.trim()) {  // Ensure that title is not empty
      const response = await axios.post('http://localhost:4000/tasks', { title: newTaskTitle });
      setTasks([...tasks, response.data]); // Add new task to the tasks array
      setNewTaskTitle(''); // Clear input field
    }
  };

  // Toggle the 'done' state of a task
  const toggleDone = async (taskId, currentDoneStatus) => {
    const response = await axios.patch(`http://localhost:4000/tasks/${taskId}`, { done: !currentDoneStatus });
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, done: response.data.done } : task
    );
    setTasks(updatedTasks); // Update task list with updated task
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      
      {/* Input and button to add a new task */}
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)} // Update input value
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add Task</button>

      {/* List of tasks */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
              {task.title} {/* Display task title */}
            </span>
            <button onClick={() => toggleDone(task.id, task.done)}>
              {task.done ? 'Mark as Not Done' : 'Mark as Done'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
