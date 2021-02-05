import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import AppProviders from 'config/AppProviders';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
);
