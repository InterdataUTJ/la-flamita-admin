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

// Empleado Pages
import EmpleadoListar from './pages/Empleado/Listar';
import EmpleadoCrear from './pages/Empleado/Crear';
import EmpleadoEditar from './pages/Empleado/Editar';
import EmpleadoMostrar from './pages/Empleado/Mostrar';

export default function App() {
  const { token } = useAuthContext();

  return (
    <StrictMode>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Navigate to={token ? "/panel" : "/login"} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/panel" element={<PanelPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/perfil/editar" element={<PerfilEditarPage />} />

            {/* Modulo EMPLEADO */}
            <Route path="/empleado/listar" element={<EmpleadoListar />} />
            <Route path="/empleado/crear" element={<EmpleadoCrear />} />
            <Route path="/empleado/editar/:id" element={<EmpleadoEditar />} />
            <Route path="/empleado/mostrar/:id" element={<EmpleadoMostrar />} />


          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </StrictMode>
  );
}