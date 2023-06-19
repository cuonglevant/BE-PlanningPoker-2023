import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const votingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    vote: String,
    connected: Boolean,
  },
  {
    _id: false,
  }
);

export default votingSchema;
