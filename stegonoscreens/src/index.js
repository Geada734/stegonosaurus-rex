import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import { AppContextProvider } from './store/app-context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);

// Might use later.
reportWebVitals();
