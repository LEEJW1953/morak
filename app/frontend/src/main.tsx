import React from 'react';
import { CookiesProvider } from 'react-cookie';

import ReactDOM from 'react-dom/client';

import App from './App';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return undefined;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </React.StrictMode>,
  );
});
