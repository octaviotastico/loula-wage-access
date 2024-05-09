import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* This lil guy causes re-renders, and multiple api calls. Remove later. */}
    <App />
  </React.StrictMode>
);
