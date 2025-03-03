import bcrypt from "bcryptjs";
import mime from "mime-types";
import Empleado from "#models/Empleado.js";
import * as storage from '#util/storage/index.js';
import { EmpleadoCreateError } from "#middlewares/error.middleware.js";

export default async function (req, res, next) {
  try {
    const { nombre, apellido, correo, clave, rol } = req.body;

    const empleado = new Empleado();
    empleado.nombre = nombre;
    empleado.apellido = apellido;
    empleado.correo = correo;
    empleado.clave = await bcrypt.hash(clave, 10);
    empleado.rol = rol;
    empleado.avatar = storage.asset("/storage/imagenes/avatar_default.svg");

    if (req.files && req.files[0]) {
      const nuevoNombre = `/public/imagenes/empleados/avatar_${empleado._id}.${mime.extension(req.files[0].mimetype)}`;
      empleado.avatar = await storage.save(nuevoNombre, req.files[0].buffer);;
    }
    
    await empleado.save();
    res.status(204).end();
  } catch (error) {
    return next(new EmpleadoCreateError(error.message));
  }
};