import { createContext, useContext, useState } from "react";
import { AuthContextProviderProps, AuthContextData, AuthContextState } from "./types";
import { PerfilEdit } from "@/services/Perfil/types";
import PerfilService from "@/services/Perfil";
import { Navigate } from "react-router";
import storage from './localStorage';

const AuthContext = createContext({} as AuthContextData);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);


export function AuthContextProvider({ children }: AuthContextProviderProps) {

  // Save the token and user in the local storage
  const [state, setState] = useState<AuthContextState>(storage.load() as AuthContextState);

  // Login function
  const handleLogin = async (correo: string, clave: string) => {
    const { token } = await PerfilService.login(correo, clave);
    const user = await PerfilService.perfil(token);
    setState(prev => storage.save({ ...prev, token, user }));
  }

  // Logout function
  const handleLogout = async () => {
    if (!state.token) return;
    try {
      await PerfilService.logout(state.token);
      setState({} as AuthContextState);
      storage.remove();
    } catch(e: Error | unknown) { 
      console.error(e) 
    }
  }

  const handleUpdate = async (props: PerfilEdit) => {
    if (!state.token) return;
    try {
      await PerfilService.editar(state.token, props);
      const user = await PerfilService.perfil(state.token);
      setState(prev => storage.save({ ...prev, user }));
    } catch(e: Error | unknown) {
      console.error(e);
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