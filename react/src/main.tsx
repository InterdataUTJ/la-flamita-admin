import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthContextProvider } from './hooks/AuthContext';
import './global.css'

// Pages
import LoginPage from './pages/Auth/Login';
import PanelPage from './pages/Panel';

function App() {
  return (
    <StrictMode>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Navigate to="/panel" />} />
            <Route path="/panel" element={<PanelPage />} />

            <Route path="/login" element={<LoginPage />} />


          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<App />)
