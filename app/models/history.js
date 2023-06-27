import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     History:
 *       type: object
 *       required:
 *         - room
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of history
 *           example: 34942793fbfa23d4157c250d
 *         issueName:
 *           type: string
 *           description: The name of issue
 *           example: write api-docs
 *         room:
 *           type: string
 *           description: The id of room
 *           example: 649909f49a96cb5a197ce741
 *         results:
 *           type: number
 *           description: The result of vote for the issue
 *           example: 0.8
 *         agreements:
 *           type: number
 *           description: The result of vote for the issue
 *           example: 3
 *         durations:
 *           type: number
 *           description: Duration of vote in seconds
 *           example: 66
 *         date:
 *           type: date
 *           description: 2023-06-26T07:56:13.359Z
 *         voteOnTotal:
 *           type: string
 *           description: number of vote over number of user in that vote
 *           example: 2/3
 *         playerResults:
 *           type: string
 *           description: Detailed result of vote
 *           example: codeholic(5), playboy(1)
 */
const historySchema = new Schema({
  issueName: String,
  room: { type: Schema.Types.ObjectId, required: true },
  results: Number,
  agreements: Number,
  durations: Number,
  date: Date,
  voteOnTotal: String,
  playerResults: String,
});

export default mongoose.model('VotingHistory', historySchema);
