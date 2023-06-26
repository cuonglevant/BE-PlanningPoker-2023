import mongoose from 'mongoose';
import { UserTypes } from '../../constants/db.constants';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: Object.values(UserTypes),
    default: UserTypes.GUEST,
  },
  photoURL: String,
  email: String,
  password: String,
});

export default mongoose.model('User', userSchema);
