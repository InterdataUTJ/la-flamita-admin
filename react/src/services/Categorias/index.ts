import Http from "../base";
import { CategoriaResponse, CategoriaRequest } from "./types";

export default class CategoriaService {
  static listar(jwt: string): Promise<CategoriaResponse[]> {
    return Http.get<CategoriaResponse[]>("/categoria/listar", { jwt }) as Promise<CategoriaResponse[]>;
  }

  static crear(jwt: string, categoria: CategoriaRequest) {
    return Http.post<undefined>("/categoria/crear", categoria, { jwt, asForm: true });
  }

  static editar(jwt: string, id: string, categoria: CategoriaRequest) {
    return Http.put<undefined>(`/categoria/editar/${id}`, categoria, { jwt, asForm: true });
  }

  static mostrar(jwt: string, id: string): Promise<CategoriaResponse> {
    return Http.get<CategoriaResponse>(`/categoria/mostrar/${id}`, { jwt }) as Promise<CategoriaResponse>;
  }

  static eliminar(jwt: string, id: string) {
    return Http.delete<undefined>(`/categoria/eliminar/${id}`, { jwt });
  }
}