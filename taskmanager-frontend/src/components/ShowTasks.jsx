// src/components/ShowTasks.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function ShowTasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    date: '',
    priority: 'low',
    assignedTo: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        console.log('Task deleted successfully:', response.data);
        fetchTasks(); // Refresh tasks after deletion
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setUpdatedTask({
      title: task.title,
      date: task.date,
      priority: task.priority,
      assignedTo: task.assignedTo
    });
  };

  const handleEditChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/tasks/${editingTaskId}`, updatedTask)
      .then(response => {
        console.log('Task updated successfully:', response.data);
        setEditingTaskId(null); // Stop editing
        fetchTasks(); // Refresh tasks after update
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  const priorityStyles = {
    high: { backgroundColor: '#FF6347', color: 'white' },
    medium: { backgroundColor: '#FFD700', color: 'black' },
    low: { backgroundColor: '#90EE90', color: 'black' }
  };

  const groupedTasks = {
    high: tasks.filter(task => task.priority === 'high'),
    medium: tasks.filter(task => task.priority === 'medium'),
    low: tasks.filter(task => task.priority === 'low')
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Show All Tasks</h1>
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', textDecoration: 'none', marginRight: '10px' }}>Back to Home</Link>
      </div>
      {Object.keys(groupedTasks).map(priority => (
        <div key={priority}>
          <h2 style={{ color: priorityStyles[priority].backgroundColor }}>{priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</h2>
          {groupedTasks[priority].length > 0 ? (
            groupedTasks[priority].map(task => (
              <div key={task._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', ...priorityStyles[priority] }}>
                {editingTaskId === task._id ? (
                  <>
                    <input type="text" name="title" value={updatedTask.title} onChange={handleEditChange} style={{ marginBottom: '10px', width: '100%', padding: '5px' }} />
                    <input type="date" name="date" value={updatedTask.date} onChange={handleEditChange} style={{ marginBottom: '10px', width: '100%', padding: '5px' }} />
                    <select name="priority" value={updatedTask.priority} onChange={handleEditChange} style={{ marginBottom: '10px', width: '100%', padding: '5px' }}>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <input type="text" name="assignedTo" value={updatedTask.assignedTo} onChange={handleEditChange} style={{ marginBottom: '10px', width: '100%', padding: '5px' }} />
                    <button onClick={handleUpdate} style={{ padding: '5px 10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Save</button>
                    <button onClick={() => setEditingTaskId(null)} style={{ padding: '5px 10px', backgroundColor: '#FF6347', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h3 style={{ marginBottom: '10px' }}>{task.title}</h3>
                    <p><strong>Date:</strong> {task.date}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <p><strong>Assigned To:</strong> {task.assignedTo}</p>
                    <div style={{ marginTop: '10px' }}>
                      <button style={{ padding: '5px 10px', backgroundColor: '#FF6347', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px', cursor: 'pointer' }} onClick={() => handleDelete(task._id)}>
                        Delete
                      </button>
                      <button style={{ padding: '5px 10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => startEditing(task)}>
                         Update
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No {priority} priority tasks</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShowTasks;
