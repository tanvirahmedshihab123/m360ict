import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

// Find the root element in your HTML
const container = document.getElementById('root');

// Create a root using createRoot
const root = createRoot(container);

// Render the app using the new API
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
