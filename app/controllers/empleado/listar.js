import { EmpleadoListError } from "#middlewares/error.middleware.js";
import Empleado from "#models/Empleado.js";

export default async function (_, res) {
  try {
    const empleados = await Empleado.listar();
    res.json(empleados);
  } catch (error) {
    return next(new EmpleadoListError(error.message));
  }
};