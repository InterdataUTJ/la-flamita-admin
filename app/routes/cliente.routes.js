import { Router } from 'express';
const clienteRouter = Router();
import auth from '../middlewares/auth.middleware.js';
import rol from '#middlewares/rol.middleware.js';
import validate from '#middlewares/validations/cliente.js';
import checkValidationResult from '#middlewares/validations/index.js';

//Rutas del cliente
import listar from '../controllers/cliente/listar.js';
import mostrar from '../controllers/cliente/mostrar.js';
import crear from '../controllers/cliente/crear.js';
import eliminar from '#controllers/cliente/eliminar.js';
import editar from '#controllers/cliente/editar.js';

// Middleware
clienteRouter.use(auth);

// Routes
clienteRouter.post('/crear', [rol("ADMINISTRADOR"), validate("crear"), checkValidationResult], crear);
clienteRouter.get('/listar', listar);
clienteRouter.get('/mostrar/:clienteId', mostrar);

clienteRouter.delete('/eliminar/:clienteId', [rol("ADMINISTRADOR")], eliminar);
clienteRouter.put('/editar/:clienteId', [rol("ADMINISTRADOR"), validate("editar"), checkValidationResult], editar);

export default clienteRouter;