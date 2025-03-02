import { Router } from 'express';
import auth from '#middlewares/auth.middleware.js';
import validate from '#middlewares/validations/empleado.js';
const empleadoRouter = Router();

// Import controller
import listar from '#controllers/empleado/listar.js';

// Routes
empleadoRouter.get('/listar', [auth], listar);
// empleadoRouter.post('/crear', [auth, validate("crear")], crear);

export default empleadoRouter;