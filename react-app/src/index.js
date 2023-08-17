import React, { StrictMode } from 'react';
import './styles/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from './app/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);


reportWebVitals();
