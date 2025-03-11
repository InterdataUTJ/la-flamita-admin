import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AuthContextProvider from './hooks/AuthContext/Provider';
import useAuthContext from './hooks/AuthContext/hook';
import './global.css'

// Pages
import LoginPage from './pages/Auth/Login';
import PanelPage from './pages/Panel';
import PerfilPage from './pages/Auth/Perfil';
import PerfilEditarPage from './pages/Auth/Editar';

export default function App() {
  const { token } = useAuthContext();

  return (
    <StrictMode>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Navigate to={token ? "/panel" : "/login"} />} />
            <Route path="/panel" element={<PanelPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/perfil/editar" element={<PerfilEditarPage />} />

            <Route path="/login" element={<LoginPage />} />


          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </StrictMode>
  );
}