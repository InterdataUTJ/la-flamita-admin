import Http from "../base";
import { EmpleadoResponse, EmpleadoRequest } from "./types";

export default class EmpleadoService {
  static listar(jwt: string): Promise<EmpleadoResponse[]> {
    return Http.get<EmpleadoResponse[]>("/empleado/listar", { jwt }) as Promise<EmpleadoResponse[]>;
  }

  static crear(jwt: string, empleado: EmpleadoRequest) {
    return Http.post<undefined>("/empleado/crear", empleado, { jwt, asForm: true });
  }

  static editar(jwt: string, id: string, empleado: EmpleadoRequest) {
    return Http.put<undefined>(`/empleado/editar/${id}`, empleado, { jwt, asForm: true });
  }

  static mostrar(jwt: string, id: string): Promise<EmpleadoResponse> {
    return Http.get<EmpleadoResponse>(`/empleado/mostrar/${id}`, { jwt }) as Promise<EmpleadoResponse>;
  }

  static eliminar(jwt: string, id: string) {
    return Http.delete<undefined>(`/empleado/eliminar/${id}`, { jwt });
  }
}