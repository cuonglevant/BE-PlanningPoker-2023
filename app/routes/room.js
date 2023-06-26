import express from 'express';
import { ROUTES } from '../../constants/routes';
import { roomController } from '../controllers/room';

const router = express.Router();

router.patch(ROUTES.ROOM.NOMINATE, roomController.nominateVote);
router.get(ROUTES.ROOM.GET_ROOM, roomController.getRoomById);
router.post('/', roomController.createRoom);

export default router;
