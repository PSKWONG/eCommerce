// ------ ------ ------ ------ ------ ------ Import Modules ------ ------ ------ ------ ------ ------
// Core Modules
import React from 'react';
import { createRoot } from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';

//Reporting 
import reportWebVitals from './reportWebVitals';

//Error Catching
import ErrorBoundary from './ErrorBoundary';

// Sample Modules
import './assets/styles/index.css';

// -----------------------

//----------------------- Import components -----------------------
import store from './store/store';
import App from './containers/AppContainer';


// ------ ------ ------ ------ ------ ------ Rendering  ------ ------ ------ ------ ------ ------
const root = createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
