import mongoose from 'mongoose';

const { Schema } = mongoose;

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
