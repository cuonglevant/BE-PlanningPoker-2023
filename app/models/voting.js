import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Voting:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The id of user has this vote
 *           example: 6494131fe94cdbd901f3372b
 *         vote:
 *           type: string
 *           nullable: true
 *           description: The vote value
 *           example: coffee
 *         connected:
 *           type: boolean
 *           default: true
 *           description: The staus that user is still in room or not
 *           example: true
 */
const votingSchema = new Schema(
  {
    user: {
      type: String,
      ref: 'User',
    },
    vote: String,
    connected: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  }
);

export default votingSchema;
