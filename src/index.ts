import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import http from 'http';
import app from './app';
import socket from './sockets';
import { env } from './constants';
import { logger } from './utils';

/**
 * Get port from environment and store in Express.
 */
// eslint-disable-next-line no-use-before-define
const port = normalizePort(env.PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Create socket.io server.
 */

socket.init(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
// eslint-disable-next-line no-use-before-define
server.on('error', onError);
// eslint-disable-next-line no-use-before-define
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  const parsedPort = parseInt(val, 10);

  if (isNaN(parsedPort)) {
    // named pipe
    return val;
  }

  if (parsedPort >= 0) {
    return parsedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
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
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  logger.info(`Listening on ${bind}`);
}

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}

process.on('SIGINT', () => {
  logger.info('Bye bye!');
  process.exit();
});
