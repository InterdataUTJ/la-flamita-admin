import { Router } from 'express';
const productoRouter = Router();
import auth from '../middlewares/auth.middleware.js';
import validate from '#middlewares/validations/producto.js';
import checkValidationResult from '#middlewares/validations/index.js';

//Rutas del producto
import crear from '../controllers/producto/crear.js';
import editar from '../controllers/producto/editar.js';
import listar from '../controllers/producto/listar.js';
import mostrar from '../controllers/producto/mostrar.js';
import eliminar from '../controllers/producto/eliminar.js';

productoRouter.post('/crear', [auth, validate("crear"), checkValidationResult], crear);
productoRouter.put('/editar/:productoId', [auth, validate("editar"), checkValidationResult], editar);
productoRouter.get('/listar', auth, listar);
productoRouter.get('/mostrar/:productoId', [auth], mostrar);
productoRouter.delete('/eliminar/:productoId', [auth], eliminar);

export default productoRouter;

