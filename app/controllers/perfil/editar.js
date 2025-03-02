import bcrypt from 'bcryptjs';
import { PerfilUpdateError } from '#middlewares/error.middleware.js';

export default async function editar(req, res, next) {
  try {
    const user = req.user;
    user.nombre = req.body.nombre || user.nombre;
    user.apellido = req.body.apellido || user.apellido;
    user.correo = req.body.correo || user.correo;

    if (req.body.clave) user.clave = await bcrypt.hash(req.body.clave, 10);
    if (req.files && req.files[0]) {
      console.log(req.files[0]);
    }

    await user.save();
    return res.status(204).send();
  } catch (error) {
    return next(new PerfilUpdateError(error.message));
  }
};