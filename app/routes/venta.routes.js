import auth from '#middlewares/auth.middleware.js';
import rol from '#middlewares/rol.middleware.js';
import validate from '#middlewares/validations/venta.js';
import checkValidationResult from '#middlewares/validations/index.js';
import { Router } from 'express';
const ventaRouter = Router();

//Importamos las funciones de los controladores
import crear from '#controllers/venta/crear.js';
import editar from '#controllers/venta/editar.js';
import eliminar from '#controllers/venta/eliminar.js';
import listar from '#controllers/venta/listar.js';
import mostrar from '#controllers/venta/mostrar.js';


// Middlewares
ventaRouter.use(auth);

// Routes
ventaRouter.post('/crear', [validate("crear"), checkValidationResult] ,crear);
ventaRouter.put('/editar/:ventaId', [validate("editar"), checkValidationResult] ,editar);
ventaRouter.delete('/eliminar/:ventaId', [rol("ADMINISTRADOR", "GERENTE")], eliminar);
ventaRouter.get('/listar', listar);
ventaRouter.get('/mostrar/:ventaId', mostrar);

export default ventaRouter;