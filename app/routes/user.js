import express from 'express';
import { ROUTES } from '../../constants/routes';
import { userController } from '../controllers/user';

/**
 * @swagger
 * tags:
 *   name: user
 *   description: user-related api
 */
const router = express.Router();

/**
 * @swagger
 * paths:
 *   '/user':
 *     get:
 *       summary: 'Get user by id'
 *       tags: [user]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: 'id attached in url when getting'
 *           schema:
 *             type: string
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
 *                     $ref: '#/components/schemas/User'
 */
router.get(ROUTES.USER.PATH, userController.getUserById);

export default router;
