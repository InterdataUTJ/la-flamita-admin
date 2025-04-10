export interface CategoriaDato {
  _id: string;
  nombre: string;
}

export interface CategoriaResponse {
  _id: string;
  datos: CategoriaDato[];
  nombre: string;
  descripcion: string;
}

export interface CategoriaRequest {
  nombre?: string;
  descripcion?: string;
  valores?: string[];
}