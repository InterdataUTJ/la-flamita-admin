import { SensorListError } from "#middlewares/error.middleware.js";
import Modulo from "#models/Modulo.js";

export default async function listar(_, res, next) {
  try {
    const sensores = await Modulo.listar();
    res.json(sensores);
  } catch (error) {
    return next(new SensorListError(error.message));
  }
};