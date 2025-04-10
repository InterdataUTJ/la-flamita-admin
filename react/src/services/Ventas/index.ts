import Http from "../base";
import { VentaResponse, VentaRequest } from "./types";

export default class VentaService {
  static listar(jwt: string): Promise<VentaResponse[]> {
    return Http.get<VentaResponse[]>("/venta/listar", { jwt }) as Promise<VentaResponse[]>;
  }

  static crear(jwt: string, venta: VentaRequest) {
    return Http.post<undefined>("/venta/crear", venta, { jwt });
  }

  static editar(jwt: string, id: string, venta: VentaRequest) {
    return Http.put<undefined>(`/venta/editar/${id}`, venta, { jwt });
  }

  static mostrar(jwt: string, id: string): Promise<VentaResponse> {
    return Http.get<VentaResponse>(`/venta/mostrar/${id}`, { jwt }) as Promise<VentaResponse>;
  }

  static entregar(jwt: string, token: string) {
    return Http.post<undefined>(`/venta/entregar`, { token }, { jwt });
  }

  static eliminar(jwt: string, id: string) {
    return Http.delete<undefined>(`/venta/eliminar/${id}`, { jwt });
  }
}