import { Router } from 'express';
const productoRouter = Router();
import auth from '../middlewares/auth.middleware.js';
import rol from '#middlewares/rol.middleware.js';
import validate from '#middlewares/validations/producto.js';

//Rutas del producto
import crear from '../controllers/producto/crear.js';
import editar from '../controllers/producto/editar.js';
import listar from '../controllers/producto/listar.js';
import mostrar from '../controllers/producto/mostrar.js';
import eliminar from '../controllers/producto/eliminar.js';

// Middleware
productoRouter.use(auth);

// Routes
productoRouter.post('/crear', [rol('ADMINISTRADOR', 'GERENTE'), validate("crear")], crear);
productoRouter.put('/editar/:productoId', [rol('ADMINISTRADOR', 'GERENTE'), validate("editar")], editar);
productoRouter.get('/listar', listar);
productoRouter.get('/mostrar/:productoId', mostrar);
productoRouter.delete('/eliminar/:productoId', [rol('ADMINISTRADOR', 'GERENTE')], eliminar);

export default productoRouter;

