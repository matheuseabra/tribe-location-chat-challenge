import socketio, { Server as SocketServer } from 'socket.io';
import { Server } from 'http';

let io: SocketServer;

interface IUser {
  [key: number]: string;
}

const connections: IUser = {} as IUser;

export const emitMessage = (userOrRoom: string, to: string, data: any) => {
  io.to(userOrRoom).emit(to, data);
};

export const setupWebSocket = (server: Server) => {
  io = socketio(server);

  io.on('connection', socket => {
    socket.join('room', () => {
      const userId = socket.handshake.query.user_id as number;

      connections[userId] = socket.id;

      emitMessage('room', 'user-connected', {});
    });

    socket.on('disconnect', () => {
      emitMessage('room', 'user-disconnected', {});
    });
  });
};
