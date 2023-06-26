import { UserService } from '../services/userService';
import { responseUtils } from '../utils/response';
import { HTTP_STATUS } from '../../constants/HTTPStatusCode';
import { RESPONSE_MESSAGE } from '../../constants/message';

export const userController = {
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserService.findUserById(id);

      if (!user) {
        return responseUtils.sendError(res, {
          status: HTTP_STATUS.NOT_FOUND,
          message: RESPONSE_MESSAGE.USER_NOT_FOUND,
        });
      }

      return responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.OK,
        data: user,
      });
    } catch {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },
};
