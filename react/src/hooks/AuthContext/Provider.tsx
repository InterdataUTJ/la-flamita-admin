import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { PerfilEdit } from "@/services/Perfil/types";
import PerfilService from "@/services/Perfil";

import { AuthContextProviderProps, AuthContextState } from "./types";
import storage from './utils/localStorage';
import AuthContext from "./index";


export default function AuthContextProvider({ children }: AuthContextProviderProps) {

  // Save the token and user in the local storage
  const [state, setState] = useState<AuthContextState>(storage.load() as AuthContextState);


  useEffect(() => {
    if (!state.token) return;
    getPerfil(state.token);
  }, [state.token]);

  const getPerfil = async (token: string) => {
    try {
      const user = await PerfilService.perfil(token);
      setState(prev => storage.save({ ...prev, token, user }));
    } catch(e: Error | unknown) {
      if (e instanceof Error && e.name === "JwtInvalidError") alert("La sesión ha expirado.");
      else alert('Error al recuperar la sesión.');

      setState({} as AuthContextState);
      storage.remove();
    }
  }

  // Login function
  const handleLogin = async (correo: string, clave: string) => {
    try {
      const { token } = await PerfilService.login(correo, clave);
      const user = await PerfilService.perfil(token);
      setState(prev => storage.save({ ...prev, token, user }));
    } catch(e: Error | unknown) {
      if (e instanceof Error) alert(e.message);
      else alert('Error al iniciar sesión');
    }
  }


  // Logout function
  const handleLogout = async () => {
    if (!state.token) return;
    try {
      await PerfilService.logout(state.token);
      setState({} as AuthContextState);
      storage.remove();
    } catch(e: Error | unknown) { 
      if (e instanceof Error) alert(e.message);
      else alert('Error al cerrar sesión.');
    }
  }

  const handleUpdate = async (props: PerfilEdit) => {
    if (!state.token) return;
    try {
      await PerfilService.editar(state.token, props);
      const user = await PerfilService.perfil(state.token);
      setState(prev => storage.save({ ...prev, user }));
    } catch(e: Error | unknown) {
      if (e instanceof Error) alert(e.message);
      else alert('Error al actualizar los datos.');
    }
  }

  
  return (
    <AuthContext.Provider value={{
      token: state.token,
      user: state.user,
      login: handleLogin,
      logout: handleLogout,
      update: handleUpdate,
      goLogin: <Navigate to="/login" replace />
    }}>
      {children}
    </AuthContext.Provider>
  );
}