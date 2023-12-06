// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import userController from './user.controller';

// Importando el validador del usuario
import userValidator from './user.validator';

// Importando el factory de validacion
import ValidateFactory from '../../services/validateFactory';

// Importando middleware de autenticacion passport
// de estrategia local

import { authLocal } from '../../services/auth.services';

// Creando una instancia del enrutador
const router = new Router();

// Enrutamos
// GET '/user/login
router.get('/login', userController.login);

// GET '/user/logout
router.get('/logout', userController.logout);

// GET '/user/register
router.get('/register', userController.register);

// POST '/user/register
router.post(
  '/register',
  ValidateFactory(userValidator.signUp),
  userController.registerPost,
);

// GET 'user/confirm/<token>'
router.get(
  '/confirm/:token',
  ValidateFactory(userValidator.token),
  userController.confirm,
);

// POST user/login
router.post('/login', authLocal);

// Exporto este tramo de ruta
export default router;
