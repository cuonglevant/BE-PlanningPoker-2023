import { Server } from 'socket.io';
import { CLIENT_URL, HOSTED_CLIENT_URL } from '../../config';
import { SOCKET_EVENT } from '../../constants/socket_event';
import { roomService } from '../services/room';

export const attachIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [CLIENT_URL, HOSTED_CLIENT_URL],
      methods: ['GET', 'POST'],
    },
  });

  io.on(SOCKET_EVENT.CONNECTION, (socket) => {
    socket.on(SOCKET_EVENT.USER.JOIN, (data) => {
      const { userId, username, roomId } = data;
      roomService.addUserToRoom(userId, username, roomId);
      socket.userId = userId;
      socket.roomId = roomId;
      socket.join(roomId);
      socket.to(roomId).emit(SOCKET_EVENT.USER.JOIN, { userId, username });
    });

    socket.on(SOCKET_EVENT.USER.VOTE, (data) => {
      const { voteValue } = data;
      roomService.nominateVote({
        roomId: socket.roomId,
        userId: socket.userId,
        vote: voteValue,
      });
      io.to(socket.roomId).emit(SOCKET_EVENT.USER.VOTE, {
        userId: socket.userId,
        voteValue,
      });
    });

    socket.on(SOCKET_EVENT.ROOM.START, () => {
      io.to(socket.roomId).emit(SOCKET_EVENT.ROOM.START);
    });

    socket.on(SOCKET_EVENT.ROOM.REVEAL, async () => {
      const history = await roomService.saveHistory(socket.roomId);
      io.to(socket.roomId).emit(SOCKET_EVENT.ROOM.REVEAL, history);
    });

    socket.on(SOCKET_EVENT.ROOM.NAME_CHANGE, (data) => {
      io.to(socket.roomId).emit(SOCKET_EVENT.ROOM.NAME_CHANGE, data);
    });

    socket.on(SOCKET_EVENT.ISSUE.NEW, (data) => {
      socket.to(socket.roomId).emit(SOCKET_EVENT.ISSUE.NEW, data);
    });

    socket.on(SOCKET_EVENT.ISSUE.REMOVE, (data) => {
      socket.to(socket.roomId).emit(SOCKET_EVENT.ISSUE.REMOVE, data);
    });

    socket.on(SOCKET_EVENT.ISSUE.NAME_CHANGE, (data) => {
      socket.to(socket.roomId).emit(SOCKET_EVENT.ISSUE.NAME_CHANGE, data);
    });

    socket.on(SOCKET_EVENT.ISSUE.SELECT, (data) => {
      socket.to(socket.roomId).emit(SOCKET_EVENT.ISSUE.SELECT, data);
    });

    socket.on(SOCKET_EVENT.ISSUE.DESELECT, (data) => {
      socket.to(socket.roomId).emit(SOCKET_EVENT.ISSUE.DESELECT, data);
    });

    socket.on(SOCKET_EVENT.DISCONNECTION, () => {
      if (socket.roomId && socket.userId) {
        roomService.removeUserFromRoom(socket.userId, socket.roomId);
      }
      socket.to(socket.roomId).emit(SOCKET_EVENT.USER.LEAVE, {
        userId: socket.userId,
      });
    });
  });
};
