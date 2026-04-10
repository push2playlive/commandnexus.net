import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("CONNECTED");
console.log("Injecting DNA from nexus_identities where domain_url = " + window.location.hostname);
console.log("V24 Dreadnought Mainframe: ONLINE");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
