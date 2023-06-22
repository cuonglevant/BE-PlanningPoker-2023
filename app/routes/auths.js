import express from 'express';
import passport from 'passport';
import '../services/passport.js';
import session from 'express-session';
import { authController } from '../controllers/auth.js';
import { CLIENT_URL, SESSION_SECRET } from '../../config.js';
import { ROUTES } from '../../constants/routes.js';

const router = express.Router();

router.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.get(
  ROUTES.AUTH.GOOGLE_OAUTH,
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  ROUTES.AUTH.GOOGLE_CALLBACK,
  passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}`,
    failureRedirect: ROUTES.AUTH.GOOGLE_CALLBACK_FAILED,
  })
);

router.get(ROUTES.AUTH.GOOGLE_CALLBACK_FAILED, authController.googleAuthFailed);

router.get(ROUTES.AUTH.GOOGLE_LOGIN_SUCCESS, authController.googleLoginSuccess);

router.use(ROUTES.AUTH.LOGOUT, authController.googleLogout);

export default router;
