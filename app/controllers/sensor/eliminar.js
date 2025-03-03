import { SensorDeleteError } from "#middlewares/error.middleware.js";
import Modulo from "#models/Modulo.js";

export default async function eliminar(req, res, next) {
  try {
    const sensor = await Modulo.findById(req.params.sensorId);
    if (!sensor) return next(new SensorDeleteError("Sensor no encontrado"));
    sensor.estado = false;
    await sensor.save();
    res.status(204).end();
  } catch (error) {
    return next(new SensorDeleteError(error.message));
  }
};