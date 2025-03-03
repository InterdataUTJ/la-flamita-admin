import { SensorShowError } from "#middlewares/error.middleware.js";
import Modulo from "#models/Modulo.js";

export default async function mostrar(req, res, next) {
  try {
    const { sensorId } = req.params;
    const sensor = await Modulo.mostrar(sensorId);
    if (!sensor) return next(new SensorShowError("Sensor no encontrado"));
    res.json(sensor);
  } catch (error) {
    return next(new SensorShowError(error.message));
  }
};