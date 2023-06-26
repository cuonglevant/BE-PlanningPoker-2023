import mongoose from 'mongoose';

const { Schema } = mongoose;

const issueSchema = new Schema({
  name: String,
  room: { type: Schema.Types.ObjectId, required: true },
  index: Number,
  storyPoints: {
    type: Number,
    default: null,
  },
});

export default mongoose.model('Issue', issueSchema);
