import jwt from 'jsonwebtoken';
import config from '#config/auth.config.js';
import Empleado from '#models/Empleado.js';
import { JwtMissingError, JwtInvalidError } from '#middlewares/error.middleware.js';

export default (req, _, next) => {
  const token = req.headers['Authorization'] || req.headers['authorization'];
  if (!token) return next(new JwtMissingError());

  try {
    const payload = jwt.verify(token.substring(7), config.secret);
    const empleado = Empleado.findByPk(payload._id);
    
    if (!empleado) return next(new JwtInvalidError());
    req.user = empleado;
    next();

  } catch(err) {
    return next(new JwtInvalidError());
  }
}