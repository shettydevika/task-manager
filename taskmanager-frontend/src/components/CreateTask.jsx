// src/components/CreateTask.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faExclamationCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function CreateTask() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    priority: 'low',
    assignedTo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tasks', formData)
      .then(response => {
        console.log('Task created successfully:', response.data);
        alert('Task created successfully');
      })
      .catch(error => {
        console.error('Error creating task:', error);
        alert('Error creating task');
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Create New Task</h1>
      <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Priority:</label>
          <select name="priority" value={formData.priority} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
            <option value="high">
              High 
            </option>
            <option value="medium">
              Medium 
            </option>
            <option value="low">
              Low 
            </option>
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Assigned To:</label>
          <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Create Task</button>
          <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#ccc', color: 'black', borderRadius: '5px', textDecoration: 'none', display: 'inline-block' }}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
