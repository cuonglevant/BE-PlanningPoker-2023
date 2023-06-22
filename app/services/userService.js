import { User } from '../models/index.js';
import { UserTypes } from '../../constants/db.constants.js';

export const UserService = {
  createGuestUser: async (username) => {
    const user = new User({
      name: username,
      type: UserTypes.GUEST,
    });
    await user.save();

    return user;
  },

  createGoogleOAuthUser: async (data) => {
    const user = new User({
      name: data.name,
      type: UserTypes.GOOGLE,
      email: data.email,
      photoURL: data.picture,
    });
    await user.save();

    return user;
  },

  findGoogleOAuthUser: async (email) => {
    const user = await User.findOne({
      email: email,
      type: UserTypes.GOOGLE,
    });

    return user;
  },
};
