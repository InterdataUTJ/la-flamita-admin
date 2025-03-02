import Empleado from '#models/Empleado.js';
import ApiToken from '#models/ApiToken.js';
import bcrypt from 'bcryptjs';
import { InvalidAuthError } from '#middlewares/error.middleware.js';

export default async function login(req, res, next) {
  try {
    const { correo, clave } = req.body;

    const empleado = await Empleado.findOne({ correo });
    const isValidPassword = await bcrypt.compare(clave, empleado?.clave);
    if (!isValidPassword) {
      return next(new InvalidAuthError());
    }

    const token = await ApiToken.crear(empleado._id);
    return res.json({ token });

  } catch (error) {
    return next(new InvalidAuthError());
  }
};