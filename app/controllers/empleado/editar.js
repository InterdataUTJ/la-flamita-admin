import bcrypt from "bcryptjs";
import mime from "mime-types";
import Empleado from "#models/Empleado.js";
import * as storage from '#util/storage/index.js';
import { EmpleadoUpdateError } from "#middlewares/error.middleware.js";

export default async function editar(req, res, next) {
  try {
    const { nombre, apellido, correo, clave, rol } = req.body;

    const empleado = await Empleado.findById(req.params.empleadoId);
    if (nombre) empleado.nombre = nombre;
    if (apellido) empleado.apellido = apellido;
    if (correo) empleado.correo = correo;
    if (clave) empleado.clave = await bcrypt.hash(clave, 10);
    if (rol) empleado.rol = rol;

    if (req.files && req.files[0]) {
      await storage.remove(empleado.avatar);
      const nuevoNombre = `/imagenes/empleados/avatar_${empleado._id}.${mime.extension(req.files[0].mimetype)}`;
      empleado.avatar = await storage.save(nuevoNombre, req.files[0].buffer);;
    }
    
    await empleado.save();
    res.status(204).end();
  } catch (error) {
    return next(new EmpleadoUpdateError(error.message));
  }
};