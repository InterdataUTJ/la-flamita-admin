export interface EmpleadoResponse {
  _id: string;
  nombre: string;
  apellido: string;
  correo: string;
  avatar: string;
  estado: boolean;
  rol: string;
}

export interface EmpleadoRequest {
  nombre?: string;
  apellido?: string;
  correo?: string;
  clave?: string;
  rol?: string;
  avatar?: File;
}