export interface ClienteCarrito {
  producto_id: string;
  cantidad: number;
  precio: number;
  descuento: number;
}

export interface ClienteResponse {
  _id: string;
  estado: boolean;
  nombre: string;
  apellido: string;
  correo: string;
  avatar: string;
  carrito?: ClienteCarrito[];
}

export interface ClienteRequest {
  nombre?: string;
  apellido?: string;
  correo?: string;
  clave?: string;
  avatar?: File;
}