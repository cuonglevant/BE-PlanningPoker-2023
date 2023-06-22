import bcrypt from 'bcrypt';
import { UserTypes } from '../../constants/db.constants.js';
import { User } from '../models/index.js';
const SALT_ROUNDS = 10;

export const authService = {
  async getUserOfTypeEmail(email) {
    const existingUser = await User.findOne({ email: email }).lean();
    return existingUser;
  },

  async createUser({ email, password, username }) {
    const passwordhash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      email,
      password: passwordhash,
      name: username,
      type: UserTypes.EMAIL,
    });
    await user.save();
    const sendUser = await User.findById(user._id)
      .select({ password: 0 })
      .lean();
    return sendUser;
  },

  async getLoggedInUserOfTypeEmail({ email, password }) {
    const user = await authService.getUserOfTypeEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      delete user.password;
      return user;
    } else {
      return null;
    }
  },
};
