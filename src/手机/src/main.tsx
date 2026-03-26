import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {TAVERN_PHONE_MSG} from './tavernPhoneBridge';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

window.parent.postMessage({type: TAVERN_PHONE_MSG.READY}, '*');
