import { VotingSystems } from '../../constants/db.constants';
import { RESPONSE_MESSAGE } from '../../constants/message';
import { NotFoundException } from '../exceptions/NotFoundException';
import { History, Room, Voting } from '../models/index';

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
      (_userVoting) => _userVoting.userId === userId
    );
    // if userId not found, that mean that user hasn't joined room
    if (userVotingIndex === -1)
      throw new NotFoundException(RESPONSE_MESSAGE.USER_NOT_IN_ROOM);
    const userVoting = { userId };
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

  async addUserToRoom(userId, username, roomId) {
    try {
      const room = await Room.findById(roomId);
      if (room) {
        const userIndex = room.voting.findIndex(
          (userVoting) => userVoting.userId === userId
        );
        if (userIndex === -1) {
          const voting = new Voting({
            userId,
            username,
            vote: '',
            connected: true,
          });
          room.voting.push(voting);
          await room.save();
        }
      }
      return true;
    } catch {
      return false;
    }
  },

  async removeUserFromRoom(userId, roomId) {
    try {
      const room = await Room.findById(roomId);
      if (room) {
        const userIndex = room.voting.findIndex(
          (userVoting) => userVoting.userId === userId
        );
        if (userIndex !== -1) {
          room.voting.splice(userIndex, 1);
          await room.save();
        }
      }
      return true;
    } catch {
      return false;
    }
  },
};
