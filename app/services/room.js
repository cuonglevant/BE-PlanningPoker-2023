import { VotingSystems } from '../../constants/db.constants.js';
import { RESPONSE_MESSAGE } from '../../constants/message.js';
import { NotFoundException } from '../exceptions/NotFoundException.js';
import { Room } from '../models/index.js';

export const roomService = {
  async createRoom(roomName) {
    const room = new Room({ name: roomName });
    await room.save();
    return room;
  },

  async nominateVote({ roomId, userId, vote }) {
    const room = await Room.findById(roomId);
    const voting = room.voting;
    const userVotingIndex = voting.findIndex(
      (_userVoting) => _userVoting.user === userId
    );
    // if userId not found, that mean that user hasn't joined room
    if (userVotingIndex === -1)
      throw new NotFoundException(RESPONSE_MESSAGE.USER_NOT_IN_ROOM);
    let userVoting = {
      user: userId,
    };
    // check if 'vote' is in 'VotingSystem'
    if (Object.values(VotingSystems.DEFAULT).includes(String(vote))) {
      //if true, we will set the value of 'vote' for this user
      userVoting.vote = vote;
    } else {
      // if not, that mean user cancelled a vote
      // we need to set 'vote' for this user is null
      userVoting.vote = null;
    }
    voting[userVotingIndex] = userVoting;
    await room.save();
  },
};
