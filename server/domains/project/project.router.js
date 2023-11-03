// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import projectController from './project.controller';

// Creando una instancia del enrutador
const router = new Router();

// Enrutamos
// GET '/user/["projects", "dashboard"]
router.get(['/', '/projects', '/dashboard'], projectController.showdasboard);

// GET '/user/project/["add-form", "add"]
router.get(['/add-form', '/add'], projectController.add);

// POST "/project/add"
router.post('/add', projectController.addPost);

// Exporto este tramo de ruta
export default router;
