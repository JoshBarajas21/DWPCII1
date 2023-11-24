// Importando manejo de sesiones
import ExpressSesion from 'express-session';
// Importando soporte para mensajes flash
import ConnectFlash from 'connect-flash';
// Importando soporte para almacenado de sesiones
import MongoStore from 'connect-mongo';
// Importando la URL de la  base de datos del sistema
import configKeys from './configKeys';

// Creando objeto de opciones para el manejo de sesiones
const options = {
  secret: 'awesome',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: configKeys.MONGO_URL,
    // Salva la sesion por 1 día
    ttl: 1 * 24 * 60 * 60,
  }),
};

// Exportando función registradora
export default (app) => {
  // Creando el middleware
  const sessionMiddleware = ExpressSesion(options);
  // Registrando middleware
  app.use(sessionMiddleware);
  // Registramos middleware de mensajes flash
  app.use(ConnectFlash);
  app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    res.locals.infoMessage = req.flash('infoMessage');
    // Esta servira para passport
    res.locals.passportError = req.flash('passportError');
    next();
  });
  // Retornado la app
  return app;
};
