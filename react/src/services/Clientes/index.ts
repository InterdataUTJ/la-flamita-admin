import Http from "../base";
import { ClienteResponse, ClienteRequest } from "./types";

export default class ClienteService {
  static listar(jwt: string): Promise<ClienteResponse[]> {
    return Http.get<ClienteResponse[]>("/cliente/listar", { jwt }) as Promise<ClienteResponse[]>;
  }

  static crear(jwt: string, cliente: ClienteRequest) {
    return Http.post<undefined>("/cliente/crear", cliente, { jwt, asForm: true });
  }

  static editar(jwt: string, id: string, cliente: ClienteRequest) {
    return Http.put<undefined>(`/cliente/editar/${id}`, cliente, { jwt, asForm: true });
  }

  static mostrar(jwt: string, id: string): Promise<ClienteResponse> {
    return Http.get<ClienteResponse>(`/cliente/mostrar/${id}`, { jwt }) as Promise<ClienteResponse>;
  }

  static eliminar(jwt: string, id: string) {
    return Http.delete<undefined>(`/cliente/eliminar/${id}`, { jwt });
  }
}