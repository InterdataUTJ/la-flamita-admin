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

// Routes
sensorRouter.get('/listar', [auth, rol('ADMINISTRADOR', 'GERENTE')], listar);
sensorRouter.post('/crear', [auth, rol('ADMINISTRADOR', 'GERENTE'), validate("crear"), checkValidationResult], crear);

sensorRouter.get('/mostrar/:sensorId', [auth, rol('ADMINISTRADOR', 'GERENTE')], mostrar);
sensorRouter.delete('/eliminar/:sensorId', [auth, rol('ADMINISTRADOR', 'GERENTE')], eliminar);
sensorRouter.put('/editar/:sensorId', [auth, rol('ADMINISTRADOR', 'GERENTE'), validate("editar"), checkValidationResult], editar);

sensorRouter.post('/enviar/:sensorId', [validate("enviar"), checkValidationResult], enviar);

export default sensorRouter;