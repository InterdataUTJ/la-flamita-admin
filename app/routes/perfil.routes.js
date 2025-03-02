import { Router } from 'express';
import validate from '#middlewares/validations/perfil.js';
import checkValidationResult from '#middlewares/validations/index.js';
import authMiddleware from '#middlewares/auth.middleware.js';
const perfilRouter = Router();

// Import controller
import login from '#controllers/perfil/login.js';
import logout from '#controllers/perfil/logout.js';
import perfil from '#controllers/perfil/perfil.js';
import editar from '#controllers/perfil/editar.js';

// Routes
perfilRouter.post('/login', [validate("login"), checkValidationResult], login);
perfilRouter.post('/logout', [authMiddleware], logout);

perfilRouter.get('/perfil', [authMiddleware], perfil);
perfilRouter.put('/perfil/editar', [validate("editar"), authMiddleware], editar);

export default perfilRouter;