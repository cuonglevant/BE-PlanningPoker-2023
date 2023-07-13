import { RESPONSE_MESSAGE } from '../../constants/message';
import { NotFoundException } from '../exceptions/NotFoundException';
import { History, Issue, Room, Voting } from '../models/index';
import { getVoteSummary } from '../utils/history';
import { RoomStatuses } from '../../constants/db.constants';

export const roomService = {
  async createRoom(roomName) {
    const room = new Room({ name: roomName });
    await room.save();
    return room;
  },

  async nominateVote({ roomId, userId, vote }) {
    const room = await Room.findById(roomId);
    if (room) {
      const userIndex = room.voting.findIndex(
        (userVoting) => userVoting.userId === userId
      );
      if (userIndex === -1) {
        throw new NotFoundException(RESPONSE_MESSAGE.USER_NOT_IN_ROOM);
      }
      room.voting[userIndex].vote = vote;
      await room.save();
    }
  },

  async getRoomById(roomId) {
    const room = await Room.findById(roomId);
    return room;
  },

  async saveHistory(roomId) {
    const room = await Room.findById(roomId);
    if (!room) return null;
    const { results, voteOnTotal, playerResults, coffeeTime, fullConsensus } =
      getVoteSummary(room.voting);
    if (fullConsensus) room.fullConsensus += 1;
    room.status = RoomStatuses.CONCLUDED;

    let issueName = '';
    if (room.selectedIssue) {
      const issue = await Issue.findById(room.selectedIssue);
      issueName = issue.name;
    }

    const history = new History({
      room: room._id,
      issueName,
      results,
      voteOnTotal,
      playerResults,
      coffeeTime,
      fullConsensus,
    });
    room.currentResults = history;
    room.save();

    await history.save();
    return history;
  },

  async findHistories(roomId) {
    const histories = await History.find({ room: roomId });
    return histories;
  },

  async changeRoomName(roomId, roomName) {
    const room = await Room.findById(roomId);
    if (!room) return null;
    room.name = roomName;
    await room.save();
  },

  async setSelectedIssue(roomId, issueId) {
    const room = await Room.findById(roomId);
    if (!room) return null;
    room.selectedIssue = issueId;
    await room.save();
  },

  async addUserToRoom(userId, username, roomId) {
    try {
      const room = await Room.findById(roomId);
      if (room) {
        const userIndex = room.voting.findIndex(
          (userVoting) => userVoting.userId === userId
        );
        if (userIndex === -1) {
          const userVoting = new Voting({
            userId,
            username,
            vote: '',
            connected: true,
          });
          room.voting.push(userVoting);
          await room.save();
        }
      }
    } catch {
      return null;
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
    } catch {
      return null;
    }
  },

  async clearRoomVoting(roomId) {
    try {
      const room = await Room.findById(roomId);
      if (room) {
        const votes = room.voting;
        votes.forEach((userVoting) => {
          userVoting.vote = null;
        });
        room.status = RoomStatuses.VOTING;
        room.currentResults = null;
        await room.save();
      }
    } catch {
      return null;
    }
  },
};
