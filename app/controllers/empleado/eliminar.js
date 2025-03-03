import Empleado from "#models/Empleado.js";
import { EmpleadoDeleteError } from "#middlewares/error.middleware.js";

export default async function eliminar(req, res, next) {
  try {
    // Buscar empleado por id
    const empleado = await Empleado.findById(req.params.empleadoId);
    if (!empleado) {
      return next(new EmpleadoDeleteError("Empleado no encontrado"));
    }

    // Actualiza el estado del empleado a false
    empleado.estado = false;
    await empleado.save();
    return res.status(204).end();

  } catch (error) {
    return next(new EmpleadoDeleteError(error.message));
  }
};