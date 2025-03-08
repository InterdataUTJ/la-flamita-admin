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
    empleado.avatar = storage.asset("/avatar_default.svg", false);

    // Guardar avatar
    const file = req.files.find(file => file.fieldname === 'avatar');
    if (file) {
      const nuevoNombre = `/imagenes/empleados/avatar_${empleado._id}.${mime.extension(file.mimetype)}`;
      empleado.avatar = await storage.save(nuevoNombre, file.buffer);
    }
    
    await empleado.save();
    res.status(204).end();
  } catch (error) {
    return next(new EmpleadoCreateError(error.message));
  }
};