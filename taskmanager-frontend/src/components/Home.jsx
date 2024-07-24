// src/components/Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Home() {
  const [taskCounts, setTaskCounts] = useState({ high: 0, medium: 0, low: 0 });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      const tasks = response.data;
      const counts = { high: 0, medium: 0, low: 0 };

      tasks.forEach(task => {
        if (task.priority === 'high') {
          counts.high += 1;
        } else if (task.priority === 'medium') {
          counts.medium += 1;
        } else if (task.priority === 'low') {
          counts.low += 1;
        }
      });

      setTaskCounts(counts);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const data = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [taskCounts.high, taskCounts.medium, taskCounts.low],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome To Task Manager</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Link to="/create-task" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', textDecoration: 'none', marginRight: '10px' }}>Create New Task</Link>
        <Link to="/show-tasks" style={{ padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>Show All Tasks</Link>
      </div>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Pie data={data} />
      </div>
    </div>
  );
}

export default Home;
