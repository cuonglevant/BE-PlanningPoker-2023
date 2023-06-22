import { validationResult } from 'express-validator';
import { CLIENT_URL } from '../../config.js';
import { HTTP_STATUS } from '../../constants/HTTPStatusCode.js';
import { RESPONSE_MESSAGE } from '../../constants/message.js';
import { authService } from '../services/auth.js';
import { responseUtils } from '../utils/response.js';

export const authController = {
  async signUpWithEmailAndPassword(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    } else {
      const { email, password, username } = req.body;
      const existingUser = await authService.getUserOfTypeEmail(email);
      if (existingUser) {
        return responseUtils.sendError(res, {
          status: HTTP_STATUS.NOT_ACCEPTED,
          message: RESPONSE_MESSAGE.SIGNUP_EMAIL_EXISTED,
        });
      }
      const sendUser = await authService.createUser({
        email,
        password,
        username,
      });
      responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.CREATED,
        data: sendUser,
      });
    }
  },
  // GET /auth/google/failure
  googleAuthFailed: (req, res) => {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
    });
  },
  // GET /auth/login/success
  googleLoginSuccess: (req, res) => {
    if (req.user) {
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        data: req.user,
      });
    }
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
    });
  },
  // REQUEST /auth/logout
  googleLogout: (req, res) => {
    try {
      req.logout((err) => {
        if (err) throw err;
      });
      res.redirect(CLIENT_URL);
    } catch (err) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
      });
    }
  },
};
