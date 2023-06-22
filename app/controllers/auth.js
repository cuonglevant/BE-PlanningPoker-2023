import { CLIENT_URL } from '../../config.js';
import { HTTP_STATUS } from '../../constants/HTTPStatusCode.js';

export const authController = {
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
