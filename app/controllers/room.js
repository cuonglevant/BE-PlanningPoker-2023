import { HTTP_STATUS } from '../../constants/HTTPStatusCode.js';
import { RESPONSE_MESSAGE } from '../../constants/message.js';
import { NotFoundException } from '../exceptions/NotFoundException.js';
import { roomService } from '../services/room.js';
import { responseUtils } from '../utils/response.js';
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

  async nominateVote(req, res) {
    try {
      const { roomId, user, vote } = req.body;
      await roomService.nominateVote({
        roomId,
        userId: user,
        vote,
      });
      responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.OK,
        data: RESPONSE_MESSAGE.SAVE_USERVOTING_SUCCESS,
      });
    } catch (err) {
      if (err instanceof NotFoundException)
        return responseUtils.sendError(res, {
          status: HTTP_STATUS.NOT_FOUND,
          message: err.message,
        });
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },
};
