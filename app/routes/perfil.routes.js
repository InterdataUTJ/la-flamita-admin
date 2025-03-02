import { Router } from 'express';
import validate from '#middlewares/validations/auth.js';
import checkValidationResult from '#middlewares/validations/index.js';
import authMiddleware from '#middlewares/auth.middleware.js';
const perfilRouter = Router();

// Import controller
import login from '#controllers/auth/login.js';
import logout from '#controllers/auth/logout.js';

// Routes
perfilRouter.post('/login', [validate("login"), checkValidationResult], login);
perfilRouter.post('/logout', [authMiddleware], logout);

export default perfilRouter;