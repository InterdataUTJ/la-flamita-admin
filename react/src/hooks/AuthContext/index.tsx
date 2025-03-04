import { createContext, useContext, useState } from "react";
import { AuthContextProviderProps, AuthContextData } from "./types";

const AuthContext = createContext({} as AuthContextData);
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [stateToken, setStateToken] = useState<string | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ 
      token: stateToken, 
      setToken: (token: string) => setStateToken(token) 
    }}>
      {children}
    </AuthContext.Provider>
  );
}