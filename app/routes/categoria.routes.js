import { Router } from 'express';
import auth from '#middlewares/auth.middleware.js';
import validate from '#middlewares/validations/categoria.js';
import checkValidationResult from '#middlewares/validations/index.js';
const categoriaRouter = Router();

// Import controller
import listar from '#controllers/categoria/listar.js';
import crear from '#controllers/categoria/crear.js';
import editar from '#controllers/categoria/editar.js';
import mostrar from '#controllers/categoria/mostrar.js';
import eliminar from '#controllers/categoria/eliminar.js';

// Routes
categoriaRouter.get('/listar', [auth], listar);
categoriaRouter.post('/crear', [auth, validate("crear"), checkValidationResult], crear);

categoriaRouter.get('/mostrar/:categoriaId', [auth], mostrar);
categoriaRouter.delete('/eliminar/:categoriaId', [auth], eliminar);
categoriaRouter.put('/editar/:categoriaId', [auth, validate("editar"), checkValidationResult], editar);

export default categoriaRouter;