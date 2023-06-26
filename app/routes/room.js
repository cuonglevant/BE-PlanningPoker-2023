import express from 'express';
import { ROUTES } from '../../constants/routes';
import { roomController } from '../controllers/room';

const router = express.Router();

router.post(ROUTES.ROOT.PATH, roomController.createRoom);

router.patch(ROUTES.ROOM.NOMINATE, roomController.nominateVote);

router.get(ROUTES.ROOM.GET_ROOM, roomController.getRoomById);

export default router;
