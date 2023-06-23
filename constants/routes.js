import { SERVER_URL } from '../config.js';

export const ROUTES = {
  ROOT: {
    PATH: '/',
  },
  AUTH: {
    PATH: '/auth',
    GOOGLE_OAUTH: '/google',
    GOOGLE_CALLBACK: '/google/callback',
    GOOGLE_CALLBACK_FULLPATH: `${SERVER_URL}/auth/google/callback`,
    GOOGLE_CALLBACK_FAILED: '/google/failure',
    GOOGLE_LOGIN_SUCCESS: '/login/success',
    LOGOUT: '/logout',
    SIGNUP: '/signup',
    GUEST_LOGIN: '/guest/login',
  },
  ROOM: {
    PATH: '/room',
  },
};
