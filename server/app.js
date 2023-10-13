// Helps to handle http errors
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
// Setting Webpack Modules
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importing webpack configuration
import webpackConfig from '../webpack.dev.config';
// Importing template-engine
import configTemplateEngine from './config/templateEngine';
// Impornting winston logger
import log from './config/winston';
// example to import debugLogger
import debug from './services/debugLogger';
// Importando enrutador
import router from './router';

// Creando variable del directorio raiz
// eslint-disable-next-line
global["__rootdir"] = path.resolve(process.cwd());

// creando la instancia de express
const app = express();

// Get the execution mode
const nodeEnviroment = process.env.NODE_ENV || 'production';

if (nodeEnviroment === 'development') {
  // Start Webpack dev server
  // console.log('🛠️  Ejecutando en modo desarrollo');
  // using debug
  debug('✒ Ejecutando en modo de desarrollo 👨‍💻');
  // Adding the key "mode" with its value "development"
  webpackConfig.mode = nodeEnviroment;
  // Setting the dev server port to the same value as the express server
  webpackConfig.devServer.port = process.env.PORT;
  // Setting up the HMR (Hot Module Replacement)
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];
  // Agregar el plugin a la configuración de desarrollo
  // de webpack
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Creating the bundler
  const bundle = webpack(webpackConfig);
  // Enabling the webpack middleware
  app.use(
    WebpackDevMiddleware(bundle, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  //  Enabling the webpack HMR
  app.use(WebpackHotMiddleware(bundle));
} else {
  console.log('🏭 Ejecutando en modo producción 🏭');
}

// Configuring the template engine
configTemplateEngine(app);

// se establecen los middlewares
app.use(morgan('dev', { stream: log.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// crear un server de archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

router.addRoutes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  log.info(`404 Página no encontrada ${req.method} ${req.originalUrl}`);
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  log.error(`${err.status || 500} - ${err.message}`);
  res.render('error');
});

export default app;
