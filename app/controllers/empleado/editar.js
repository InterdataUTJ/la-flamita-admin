import bcrypt from "bcryptjs";
import mime from "mime-types";
import Empleado from "#models/Empleado.js";
import * as storage from '#util/storage/index.js';
import { EmpleadoUpdateError } from "#middlewares/error.middleware.js";

export default async function editar(req, res, next) {
  try {
    const { nombre, apellido, correo, clave, rol } = req.body;

    const empleado = await Empleado.findById(req.params.empleadoId);
    if (!empleado) return next(new EmpleadoUpdateError("Empleado no encontrado"));

    if (nombre) empleado.nombre = nombre;
    if (apellido) empleado.apellido = apellido;
    if (correo) empleado.correo = correo;
    if (clave) empleado.clave = await bcrypt.hash(clave, 10);
    if (rol) empleado.rol = rol;

    // Guardar avatar
    const file = req.files.find(file => file.fieldname === 'avatar');
    if (file) {
      await storage.remove(empleado.avatar);
      const nuevoNombre = `/imagenes/empleados/avatar_${empleado._id}.${mime.extension(file.mimetype)}`;
      empleado.avatar = await storage.save(nuevoNombre, file.buffer);
    }
    
    await empleado.save();
    res.status(204).end();
  } catch (error) {
    return next(new EmpleadoUpdateError(error.message));
  }
};