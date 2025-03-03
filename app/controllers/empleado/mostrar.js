import Empleado from "#models/Empleado.js";
import { EmpleadoShowError } from "#middlewares/error.middleware.js";

export default async function mostrar(req, res, next) {
  try {
    const empleado = await Empleado.mostrar(req.params.empleadoId);
    if (!empleado) {
      return next(new EmpleadoShowError("Empleado no encontrado"));
    }

    return res.status(200).json(empleado);
  } catch (error) {
    return next(new EmpleadoShowError(error.message));
  }
};