import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import useAuthContext from './hooks/AuthContext/hook';
import './global.css'

// Pages

// Errors
import Error404Page from './pages/Errors/404';

// Auth
import LoginPage from './pages/Auth/Login';
import PanelPage from './pages/Panel';
import PerfilPage from './pages/Auth/Perfil';
import PerfilEditarPage from './pages/Auth/Editar';

// Empleado Pages
import EmpleadoListar from './pages/Empleado/Listar';
import EmpleadoCrear from './pages/Empleado/Crear';
import EmpleadoEditar from './pages/Empleado/Editar';
import EmpleadoMostrar from './pages/Empleado/Mostrar';

// Categoria Pages
import CategoriaListar from './pages/Categoria/Listar';
import CategoriaCrear from './pages/Categoria/Crear';
import CategoriaEditar from './pages/Categoria/Editar';
import CategoriaMostrar from './pages/Categoria/Mostrar';

// Producto Pages
import ProductoListar from './pages/Producto/Listar';
import ProductoCrear from './pages/Producto/Crear';
import ProductoEditar from './pages/Producto/Editar';
import ProductoMostrar from './pages/Producto/Mostrar';

// Sensor Pages
import SensorListar from './pages/Sensor/Listar';


export default function App() {
  const { token } = useAuthContext();

  return (
    <StrictMode>
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

            {/* Modulo CATEGORIA */}
            <Route path="/categoria/listar" element={<CategoriaListar />} />
            <Route path="/categoria/crear" element={<CategoriaCrear />} />
            <Route path="/categoria/editar/:id" element={<CategoriaEditar />} />
            <Route path="/categoria/mostrar/:id" element={<CategoriaMostrar />} />

            {/* Modulo PRODUCTO */}
            <Route path="/producto/listar" element={<ProductoListar />} />
            <Route path="/producto/crear" element={<ProductoCrear />} />
            <Route path="/producto/editar/:id" element={<ProductoEditar />} />
            <Route path="/producto/mostrar/:id" element={<ProductoMostrar />} />

            {/* Modulo SENSOR */}
            <Route path="/sensor/listar" element={<SensorListar />} />
            <Route path="/sensor/crear" element={<ProductoCrear />} />
            <Route path="/sensor/editar/:id" element={<ProductoEditar />} />
            <Route path="/sensor/mostrar/:id" element={<ProductoMostrar />} />


            <Route path='*' element={<Error404Page />} />


          </Routes>
        </BrowserRouter>
    </StrictMode>
  );
}