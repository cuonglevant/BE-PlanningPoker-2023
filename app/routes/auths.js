import express from 'express';
import session from 'express-session';
import { body } from 'express-validator';
import passport from 'passport';
import { CLIENT_URL, SESSION_SECRET } from '../../config.js';
import { ROUTES } from '../../constants/routes.js';
import { authController } from '../controllers/auth.js';
import '../services/passport.js';
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

router.post(ROUTES.AUTH.GUEST_LOGIN, authController.guestLogin);

router.post(
  ROUTES.AUTH.SIGNUP,
  body('email').trim().isEmail(),
  body('password').isLength({ min: 6 }),
  authController.signUpWithEmailAndPassword
);

router.post(ROUTES.AUTH.EMAIL_LOGIN, authController.loginWithEmail);
export default router;
