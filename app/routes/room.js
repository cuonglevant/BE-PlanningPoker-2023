import express from 'express';
import { ROUTES } from '../../constants/routes';
import { roomController } from '../controllers/room';

/**
 * @swagger
 * tags:
 *   name: room
 *   description: The books managing API
 */
const router = express.Router();

/**
 * @swagger
 * paths:
 *   '/room':
 *     post:
 *       summary: 'Create room'
 *       tags: [room]
 *       requestBody:
 *         required: true
 *         content:
 *           'application/json':
 *             schema:
 *               type: object
 *               properties:
 *                 roomName:
 *                   type: string
 *       responses:
 *         200:
 *           description: 'return user info in data'
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     $ref: '#/components/schemas/Room'
 */
router.post(ROUTES.ROOT.PATH, roomController.createRoom);

/**
 * @swagger
 * paths:
 *   '/room':
 *     get:
 *       summary: 'Get room by id'
 *       tags: [room]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: 'id attached in url when getting'
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: 'return room info in data'
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     $ref: '#/components/schemas/Room'
 */
router.get(ROUTES.ROOM.GET_ROOM, roomController.getRoomById);

/**
 * @swagger
 * paths:
 *   '/room/nominate':
 *     post:
 *       summary: 'API for user when nominate for voting'
 *       tags: [room]
 *       requestBody:
 *         required: true
 *         content:
 *           'application/json':
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: 'return message if the vote data is saved'
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: 'Save user voting successfully'
 */
/**
 * @swagger
 * /room/nominate:
 *   patch:
 *     summary: Nominate vote
 *     tags: [room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: The ID of room
 *                 example: 649909f49a96cb5a197ce741
 *               user:
 *                 type: string
 *                 description: The ID of user
 *                 example: 6494131fe94cdbd901f3372b
 *               vote:
 *                 type: string
 *                 description: The value of vote
 *                 example: 'coffee'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: response success or not
 *                   example: true
 *                 data:
 *                   type: string
 *                   description: response message
 *                   example: Save user voting successfully
 *       404:
 *         description: NOT_FOUND
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: response success or not
 *                   example: false
 *                 data:
 *                   type: string
 *                   description: response message
 *                   example: User is not in room
 *       500:
 *         description: INTERNAL_SERVER_ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: response success or not
 *                   example: false
 *                 data:
 *                   type: string
 *                   description: response message
 *                   example: Internal Server Error
 */
router.patch(ROUTES.ROOM.NOMINATE, roomController.nominateVote);

export default router;
