#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from 'http';
import app from '../app';

import debug from '../services/debugLogger';
// Importing winston logger
import log from '../config/winston';

// Importing configuration keys
import configKeys from '../config/configKeys';

/**
 * Create HTTP server.
 */

log.info('The server is created from the express instance');
const server = http.createServer(app);
// app es (req, res) => {} (callback)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN.port) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(configKeys.PORT);
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      log.error(`${bind} requieres elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      log.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  log.info(`⭐⭐ Listening on ${process.env.APP_URL}:${addr.port} ⭐⭐`);
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`📣 Listening on ${bind}`);
}
// línea de eddy, se encuentra en la
// documentación de express

// debug.enabled = true;

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
// resgitrando eventos en el servidor
server.on('error', onError);
server.on('listening', onListening);
