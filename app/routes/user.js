import express from 'express';
import { ROUTES } from '../../constants/routes';
import { userController } from '../controllers/user';

const router = express.Router();

router.get(ROUTES.USER.GET_BY_ID, userController.getUserById);

export default router;
