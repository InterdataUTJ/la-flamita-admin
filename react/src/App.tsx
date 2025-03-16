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

import ClienteCrear from './pages/Cliente/Crear';
import ClienteListar from './pages/Cliente/Listar';
import ClienteEditar from './pages/Cliente/Editar';
import ClienteMostrar from './pages/Cliente/Mostrar';

export default function App() {
  const { token } = useAuthContext();

  return (
    <StrictMode>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/*" element={<Navigate to={token ? "/panel" : "/login"} />} />
            <Route path="/panel" element={<PanelPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/perfil/editar" element={<PerfilEditarPage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/cliente/listar" element={<ClienteListar />} />
            <Route path="/cliente/crear" element={<ClienteCrear />} />
            <Route path="/cliente/editar/:id" element={<ClienteEditar />} />
            <Route path="/cliente/mostrar/:id" element={<ClienteMostrar />} />


          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </StrictMode> 
  );
}