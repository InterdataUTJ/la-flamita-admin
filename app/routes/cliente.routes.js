import { Router } from 'express';
const clienteRouter = Router();
import auth from '../middlewares/auth.middleware.js';
import validate from '#middlewares/validations/cliente.js';
import checkValidationResult from '#middlewares/validations/index.js';

//Rutas del cliente
import listar from '../controllers/cliente/listar.js';
import mostrar from '../controllers/cliente/mostrar.js';
import crear from '../controllers/cliente/crear.js';
import eliminar from '#controllers/cliente/eliminar.js';
import editar from '#controllers/cliente/editar.js';

clienteRouter.post('/crear', [auth, validate("crear"), checkValidationResult], crear);
clienteRouter.get('/listar', [auth], listar);
clienteRouter.get('/mostrar/:clienteId', [auth], mostrar);

clienteRouter.delete('/eliminar/:clienteId', [auth], eliminar);
clienteRouter.put('/editar/:clienteId', [auth, validate("editar"), checkValidationResult], editar);

export default clienteRouter;