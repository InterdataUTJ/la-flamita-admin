import auth from '#middlewares/auth.middleware.js';
import validate from '#middlewares/validations/venta.js';
import checkValidationResult from '#middlewares/validations/index.js';
import { Router } from 'express';

//Importamos las funciones de los controladores
import crear from '#controllers/venta/crear.js';
import editar from '#controllers/venta/editar.js';
import eliminar from '#controllers/venta/eliminar.js';
import listar from '#controllers/venta/listar.js';
import mostrar from '#controllers/venta/mostrar.js';

const ventaRouter = Router();

ventaRouter.post('/crear',[auth,validate("crear"),checkValidationResult] ,crear);
ventaRouter.put('/editar/:ventaId',[auth,validate("editar"),checkValidationResult] ,editar);
ventaRouter.delete('/eliminar/:ventaId',auth,eliminar);
ventaRouter.get('/listar',auth,listar);
ventaRouter.get('/mostrar/:ventaId',auth, mostrar);

export default ventaRouter;