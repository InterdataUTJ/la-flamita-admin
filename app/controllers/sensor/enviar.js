import { SensorSendError } from "#middlewares/error.middleware.js";
import Modulo from "#models/Modulo.js";

export default async function enviar(req, res, next) {
  try {
    // Buscar el sensor por el id
    const { sensorId } = req.params;
    const sensor = await Modulo.mostrar(sensorId);
    if (!sensor) return next(new SensorSendError("Credenciales incorrectas"));

    // Verificar que el token sea correcto
    const token = req.headers["Authorization"] || req.headers["authorization"] || req.headers["x-access-token"] || "";
    if (sensor.token !== token.substring(7)) return next(new SensorSendError("Credenciales incorrectas"));

    // Guardar los datos en el sensor
    const { dato } = req.body;
    if (sensor.tipo === "SENSOR") sensor.datos.push({ dato });
    else if (sensor.tipo === "ACTUADOR") sensor.datos = [{ dato }];
    sensor.markModified("datos");
    sensor.markModified("datos.dato");
    await sensor.save();
    
    res.status(204).end();

  } catch (error) {
    return next(new SensorSendError(error.message));
  }
};

export async function consultar(req, res, next) {
  try {
    
    // Buscar el sensor por el id
    const { sensorId } = req.params;
    const sensor = await Modulo.mostrar(sensorId);

    // Verificar que el token sea correcto
    const token = req.headers["Authorization"] || req.headers["authorization"] || req.headers["x-access-token"] || "";
    if (sensor.token !== token.substring(7)) return next(new SensorSendError("Credenciales incorrectas"));

    // Enviar el último dato
    const dato = sensor.datos[sensor.datos.length - 1];
    if (!dato) return res.json({ dato: "0", timestamp: new Date() });
    return res.json(dato);

  } catch (error) {
    return next(new SensorSendError(error.message));
  }
}