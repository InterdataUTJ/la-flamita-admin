import { createRoot } from 'react-dom/client';
import App from './App';
import AuthContextProvider from './hooks/AuthContext/Provider';

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
