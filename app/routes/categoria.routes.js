import { Router } from 'express';
import auth from '#middlewares/auth.middleware.js';
import rol from '#middlewares/rol.middleware.js';
import validate from '#middlewares/validations/categoria.js';
const categoriaRouter = Router();

// Import controller
import listar from '#controllers/categoria/listar.js';
import crear from '#controllers/categoria/crear.js';
import editar from '#controllers/categoria/editar.js';
import mostrar from '#controllers/categoria/mostrar.js';
import eliminar from '#controllers/categoria/eliminar.js';

// Middleware
categoriaRouter.use(auth);

// Routes
categoriaRouter.get('/listar', listar);
categoriaRouter.post('/crear', [rol("ADMINISTRADOR", "GERENTE"), validate("crear")], crear);

categoriaRouter.get('/mostrar/:categoriaId', mostrar);
categoriaRouter.delete('/eliminar/:categoriaId', [rol("ADMINISTRADOR", "GERENTE")], eliminar);
categoriaRouter.put('/editar/:categoriaId', [rol("ADMINISTRADOR", "GERENTE"), validate("editar")], editar);

export default categoriaRouter;