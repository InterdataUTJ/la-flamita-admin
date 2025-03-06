import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthContextProvider, useAuthContext } from './hooks/AuthContext';
import './global.css'

// Pages
import LoginPage from './pages/Auth/Login';
import PanelPage from './pages/Panel';

function App() {
  const { token } = useAuthContext();

  return (
    <StrictMode>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Navigate to={!!token ? "/panel" : "/login"} />} />
            <Route path="/panel" element={<PanelPage />} />
            <Route path="/login" element={<LoginPage />} />


          </Routes>
        </BrowserRouter>
      
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
