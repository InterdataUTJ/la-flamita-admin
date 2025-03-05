import { Router } from 'express';
import auth from '#middlewares/auth.middleware.js';
import rol from '#middlewares/rol.middleware.js';
import validate from '#middlewares/validations/empleado.js';
const empleadoRouter = Router();

// Import controller
import listar from '#controllers/empleado/listar.js';
import crear from '#controllers/empleado/crear.js';
import editar from '#controllers/empleado/editar.js';
import mostrar from '#controllers/empleado/mostrar.js';
import eliminar from '#controllers/empleado/eliminar.js';

// Middleware
empleadoRouter.use(auth);

// Routes
empleadoRouter.get('/listar', [rol("ADMINISTRADOR", "GERENTE")], listar);
empleadoRouter.post('/crear', [rol("ADMINISTRADOR", "GERENTE"), validate("crear")], crear);

empleadoRouter.get('/mostrar/:empleadoId', [rol("ADMINISTRADOR", "GERENTE")], mostrar);
empleadoRouter.delete('/eliminar/:empleadoId', [rol("ADMINISTRADOR")], eliminar);
empleadoRouter.put('/editar/:empleadoId', [rol("ADMINISTRADOR", "GERENTE"), validate("editar")], editar);

export default empleadoRouter;