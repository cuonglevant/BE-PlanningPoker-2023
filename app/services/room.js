import { VotingSystems } from '../../constants/db.constants';
import { RESPONSE_MESSAGE } from '../../constants/message';
import { NotFoundException } from '../exceptions/NotFoundException';
import { History, Room } from '../models/index';

export const roomService = {
  async createRoom(roomName) {
    const room = new Room({ name: roomName });
    await room.save();
    return room;
  },

  async nominateVote({ roomId, userId, vote }) {
    const room = await Room.findById(roomId);
    const { voting } = room;
    const userVotingIndex = voting.findIndex(
      (_userVoting) => _userVoting.user === userId
    );
    // if userId not found, that mean that user hasn't joined room
    if (userVotingIndex === -1)
      throw new NotFoundException(RESPONSE_MESSAGE.USER_NOT_IN_ROOM);
    const userVoting = {
      user: userId,
    };
    // check if 'vote' is in 'VotingSystem'
    if (Object.values(VotingSystems.DEFAULT).includes(String(vote))) {
      // if true, we will set the value of 'vote' for this user
      userVoting.vote = vote;
    } else {
      // if not, that mean user cancelled a vote
      // we need to set 'vote' for this user is null
      userVoting.vote = null;
    }
    voting[userVotingIndex] = userVoting;
    await room.save();
  },

  async getRoomById(roomId) {
    const room = await Room.findById(roomId);
    return room;
  },

  async saveHistory({
    issueName,
    room,
    results,
    agreements,
    durations,
    date,
    voteOnTotal,
    playerResults,
  }) {
    await History.create({
      issueName,
      room,
      results,
      agreements,
      durations,
      date,
      voteOnTotal,
      playerResults,
    });
  },
};
