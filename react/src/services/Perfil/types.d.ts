export interface LoginResponse {
  token: string;
}

export interface PerfilResponse {
  _id: string;
  nombre: string;
  apellido: string;
  correo: string;
  avatar: string;
  estado: boolean;
  rol: string;
}

export interface PerfilEdit {
  nombre?: string;
  apellido?: string;
  correo?: string;
  clave?: string;
  avatar?: File;
}