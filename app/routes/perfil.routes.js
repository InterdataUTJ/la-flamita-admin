import { Router } from 'express';
import validate from '#middlewares/validations/auth.js';
import checkValidationResult from '#middlewares/validations/index.js';
const perfilRouter = Router();

// Import controller
import login from '#controllers/auth/login.js';

// Routes
perfilRouter.post('/login', [validate("login"), checkValidationResult], login);

export default perfilRouter;