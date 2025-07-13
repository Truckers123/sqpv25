/**
 * Main entry point for the SQ Invest CRM application
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './shadcn.css';

/**
 * Root element initialization
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);