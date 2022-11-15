import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Welcome from './pages/welcome';
import Dashboard from './pages/dashboard';
import Audit_Process from './pages/audit_process';

function App() {
  return (
    <BrowserRouter>
      <Routes> {/* The Routes decides which component to show based on the current URL.*/}
        <Route path='/' element={<React_App/>}></Route>
        <Route path='/welcome' element={<Welcome/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/audit_process' element={<Audit_Process/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

function React_App() {
  return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <a
        className="App-link"
        href="/dashboard"
        rel="noopener noreferrer"
      >
        Doashboard
      </a>
    </header>
  </div>
  );
}

export default App;