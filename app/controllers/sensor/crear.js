import { SensorCreateError } from "#middlewares/error.middleware.js";
import Modulo from "#models/Modulo.js";
import crypto from "node:crypto";

export default async function crear(req, res, next) {
  try {
    const { nombre } = req.body;
    const sensor = new Modulo();
    sensor.nombre = nombre;
    sensor.estado = true;
    sensor.token = `${Date.now()}_${crypto.randomBytes(5).toString('hex')}`;
    await sensor.save();
    res.status(204).end();
  } catch (error) {
    return next(new SensorCreateError(error.message));
  }
};