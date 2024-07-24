// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateTask from './components/CreateTask'; // Make sure to create this component
import ShowTasks from './components/ShowTasks';   // Make sure to create this component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/show-tasks" element={<ShowTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
