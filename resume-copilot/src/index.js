import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Replace these values with your Auth0 domain and client ID
const auth0Domain = 'dev-6gb5dj5y00rbgay1.us.auth0.com';
const auth0ClientId = 'iH9BUfGKNVerNf9UvmBDKoRmb51D6bXo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
