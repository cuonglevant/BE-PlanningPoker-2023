import express from 'express';
import { ROUTES } from '../../constants/routes.js';
import { roomController } from '../controllers/room.js';
const router = express.Router();

router.patch(ROUTES.ROOM.NOMINATE, roomController.nominateVote);
router.post('/', roomController.createRoom);

export default router;
