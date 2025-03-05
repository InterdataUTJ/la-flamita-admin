import { AuthNeededError } from '#middlewares/error.middleware.js';

export default function rolMiddleware(...rolPermission) {
  return function (req, _, next) {
    if (!req.user) return next(new AuthNeededError());
    if (!req.user.rol) return next(new AuthNeededError("Tu usuario no cuenta con un rol"));

    // Todos los roles tienen permisos de usuario
    if (!rolPermission) return next();
    if (!rolPermission.length === 0) return next();

    // El rol es uno de los permisos
    if (Array.isArray(rolPermission) && rolPermission.includes(req.user.rol)) return next();

    // No tienes acceso
    return next(new AuthNeededError("No tienes permisos suficientes para realizar esta acción", 401));
  }
}