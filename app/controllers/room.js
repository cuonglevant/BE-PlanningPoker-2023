import { HTTP_STATUS } from '../../constants/HTTPStatusCode.js';
import { RESPONSE_MESSAGE } from '../../constants/message.js';
import { roomService } from '../services/room.js';

export const roomController = {
  async createRoom(req, res) {
    try {
      const roomName = req.body.roomName;
      const room = await roomService.createRoom(roomName);
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: room,
      });
    } catch {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },
};
