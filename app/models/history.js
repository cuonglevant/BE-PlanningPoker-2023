import mongoose from 'mongoose';

const { Schema } = mongoose;

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
