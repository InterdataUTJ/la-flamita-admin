import { Router } from 'express';
import auth from '#middlewares/auth.middleware.js';
import validate from '#middlewares/validations/empleado.js';
import checkValidationResult from '#middlewares/validations/index.js';
const empleadoRouter = Router();

// Import controller
import listar from '#controllers/empleado/listar.js';
import crear from '#controllers/empleado/crear.js';
import editar from '#controllers/empleado/editar.js';
import mostrar from '#controllers/empleado/mostrar.js';
import eliminar from '#controllers/empleado/eliminar.js';

// Routes
empleadoRouter.get('/listar', [auth], listar);
empleadoRouter.post('/crear', [auth, validate("crear"), checkValidationResult], crear);

empleadoRouter.get('/mostrar/:empleadoId', [auth], mostrar);
empleadoRouter.delete('/eliminar/:empleadoId', [auth], eliminar);
empleadoRouter.put('/editar/:empleadoId', [auth, validate("editar"), checkValidationResult], editar);

export default empleadoRouter;