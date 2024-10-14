import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
