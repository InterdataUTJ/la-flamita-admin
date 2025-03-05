import { Router } from 'express';
import auth from '#middlewares/auth.middleware.js';
import rol from '#middlewares/rol.middleware.js';
import validate from '#middlewares/validations/sensor.js';
import checkValidationResult from '#middlewares/validations/index.js';
const sensorRouter = Router();

// Import controller
import listar from '#controllers/sensor/listar.js';
import crear from '#controllers/sensor/crear.js';
import editar from '#controllers/sensor/editar.js';
import mostrar from '#controllers/sensor/mostrar.js';
import eliminar from '#controllers/sensor/eliminar.js';
import enviar from '#controllers/sensor/enviar.js';

// Global Middleware
sensorRouter.use(rol('ADMINISTRADOR', 'GERENTE'));

// Routes
sensorRouter.get('/listar', [auth], listar);
sensorRouter.post('/crear', [auth, validate("crear"), checkValidationResult], crear);

sensorRouter.get('/mostrar/:sensorId', [auth], mostrar);
sensorRouter.delete('/eliminar/:sensorId', [auth], eliminar);
sensorRouter.put('/editar/:sensorId', [auth, validate("editar"), checkValidationResult], editar);

sensorRouter.post('/enviar/:sensorId', [validate("enviar"), checkValidationResult], enviar);

export default sensorRouter;