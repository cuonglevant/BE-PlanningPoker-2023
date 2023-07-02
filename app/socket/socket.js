import { Server } from 'socket.io';
import { CLIENT_URL, HOSTED_CLIENT_URL } from '../../config';
import { SOCKET_EVENT } from '../../constants/socket_event';

export const attachIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [CLIENT_URL, HOSTED_CLIENT_URL],
      methods: ['GET', 'POST'],
    },
  });

  io.on(SOCKET_EVENT.CONNECTION, (socket) => {
    socket.on(SOCKET_EVENT.USER.JOIN, (data) => {
      const { userId, roomId } = data;
      socket.userId = userId;
      socket.roomId = roomId;
      socket.join(roomId);
      io.to(roomId).emit(SOCKET_EVENT.USER.JOIN, { userId });
    });

    socket.on(SOCKET_EVENT.USER.VOTE, (data) => {
      const { voteValue } = data;
      io.to(socket.roomId).emit(SOCKET_EVENT.USER.VOTE, {
        userId: socket.userId,
        voteValue,
      });
    });

    socket.on(SOCKET_EVENT.USER.UNVOTE, () => {
      io.to(socket.roomId).emit(SOCKET_EVENT.USER.UNVOTE, {
        userId: socket.userId,
      });
    });

    socket.on(SOCKET_EVENT.ROOM.START, () => {
      io.to(socket.roomId).emit(SOCKET_EVENT.ROOM.START);
    });

    socket.on(SOCKET_EVENT.ROOM.REVEAL, () => {
      io.to(socket.roomId).emit(SOCKET_EVENT.ROOM.REVEAL);
    });

    socket.on(SOCKET_EVENT.ROOM.NAME_CHANGE, (data) => {
      io.to(socket.roomId).emit(SOCKET_EVENT.ROOM.NAME_CHANGE, data);
    });

    socket.on(SOCKET_EVENT.ISSUE.NEW, (data) => {
      io.to(socket.roomId).emit(SOCKET_EVENT.ISSUE.NEW, data);
    });

    socket.on(SOCKET_EVENT.ISSUE.REMOVE, (data) => {
      io.to(socket.roomId).emit(SOCKET_EVENT.ISSUE.REMOVE, data);
    });

    socket.on(SOCKET_EVENT.ISSUE.NAME_CHANGE, (data) => {
      io.to(socket.roomId).emit(SOCKET_EVENT.ISSUE.NAME_CHANGE, data);
    });

    socket.on(SOCKET_EVENT.ISSUE.SELECT, (data) => {
      io.to(socket.roomId).emit(SOCKET_EVENT.ISSUE.SELECT, data);
    });

    socket.on(SOCKET_EVENT.ISSUE.DESELECT, (data) => {
      io.to(socket.roomId).emit(SOCKET_EVENT.ISSUE.DESELECT, data);
    });

    socket.on(SOCKET_EVENT.DISCONNECTION, () => {
      io.to(socket.roomId).emit(SOCKET_EVENT.USER.LEAVE, {
        userId: socket.userId,
      });
    });
  });
};
