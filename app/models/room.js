import mongoose from 'mongoose';
import {
  ROOM_NAME_DEFAULT,
  RoomStatuses,
  VotingSystems,
} from '../../constants/db.constants';
import votingSchema from './voting';

const { Schema } = mongoose;

const roomSchema = new Schema({
  name: {
    type: String,
    default: ROOM_NAME_DEFAULT,
  },
  fullConsensus: {
    type: Number,
    default: 0,
  },
  votingSystem: {
    type: Array,
    default: VotingSystems.DEFAULT,
  },
  status: {
    type: String,
    enum: Object.values(RoomStatuses),
    default: RoomStatuses.READY,
  },
  voting: [votingSchema],
  selectedIssue: Schema.Types.ObjectId,
});

export default mongoose.model('Room', roomSchema);
