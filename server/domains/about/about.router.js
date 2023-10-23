// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import aboutController from './about.controller';

// Creando una instancia del enrutador
const router = new Router();

// Enrutamos
// GET '/user/about
router.get('/', aboutController.about);

// Exporto este tramo de ruta
export default router;
