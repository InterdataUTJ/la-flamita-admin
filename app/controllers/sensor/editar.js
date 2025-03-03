import { SensorUpdateError } from "#middlewares/error.middleware.js";
import Modulo from "#models/Modulo.js";

export default async function editar(req, res, next) {
  try {
    const { nombre } = req.body;
    const sensor = await Modulo.findById(req.params.sensorId);
    if (!sensor) return next(new SensorUpdateError("Sensor no encontrado"));

    if (nombre) sensor.nombre = nombre;
    await sensor.save();

    res.status(204).end();
  } catch (error) {
    return next(new SensorUpdateError(error.message));
  }
};