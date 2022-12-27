import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Popup from './pages/popup/Popup';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import App from './App';

import Welcome from './pages/welcome';
import Dashboard from './pages/dashboard';
import Audit_Process from './pages/audit_process';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
