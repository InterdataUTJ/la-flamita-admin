export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  token: string | undefined;
  setToken: (token: string) => void;
}