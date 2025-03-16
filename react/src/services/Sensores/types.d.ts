export interface SensorDato {
  _id: string;
  dato: string;
  timestamp: string;
}

export interface SensorResponse {
  _id: string;
  estado: boolean;
  datos: SensorDato[];
  nombre: string;
  token: string;
}

export interface SensorRequest {
  nombre?: string;
}