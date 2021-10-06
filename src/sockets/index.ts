import { Server, Socket } from 'socket.io';
import http from 'http';
import { logger } from '../utils';

interface ISocket {
  init: (server: http.Server) => void;
}

const socketio = new Server();

const sockets: ISocket = {
  init: (server: http.Server) => {
    const io = socketio.listen(server);
    io.sockets.on('connection', (socket: Socket) => {
      logger.info('socket connected');
      socket.on('message', (data) => {
        logger.info(data);
      });
    });
  },
};

export default sockets;
