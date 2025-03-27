import auth from '#middlewares/auth.middleware.js';
import rol from '#middlewares/rol.middleware.js';
import validate from '#middlewares/validations/venta.js';
import { Router } from 'express';
const ventaRouter = Router();

//Importamos las funciones de los controladores
import crear from '#controllers/venta/crear.js';
import editar from '#controllers/venta/editar.js';
import eliminar from '#controllers/venta/eliminar.js';
import listar from '#controllers/venta/listar.js';
import mostrar from '#controllers/venta/mostrar.js';
import entregar from '#controllers/venta/entregar.js';


// Middlewares
ventaRouter.use(auth);

// Routes
ventaRouter.post('/crear', [validate("crear")] ,crear);
ventaRouter.post('/entregar', [validate("entregar")], entregar);
ventaRouter.put('/editar/:ventaId', [validate("editar")] ,editar);
ventaRouter.delete('/eliminar/:ventaId', [rol("ADMINISTRADOR", "GERENTE")], eliminar);
ventaRouter.get('/listar', listar);
ventaRouter.get('/mostrar/:ventaId', mostrar);

export default ventaRouter;