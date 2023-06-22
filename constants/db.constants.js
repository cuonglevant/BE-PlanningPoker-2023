const VotingSystems = {
  DEFAULT: [
    '0',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '21',
    '34',
    '55',
    '89',
    '?',
    'coffee',
  ],
};
const UserTypes = {
  GOOGLE: 'google',
  EMAIL: 'email',
  GUEST: 'guest',
};
const RoomStatuses = {
  READY: 'ready',
  VOTING: 'voting',
  CONCLUDED: 'concluded',
};
const ROOM_NAME_DEFAULT = 'Planning poker game';

export { ROOM_NAME_DEFAULT, RoomStatuses, UserTypes, VotingSystems };
