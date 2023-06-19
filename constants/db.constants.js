const VOTING_SYSTEM = {
	DEFAULT: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?', 'coffee'],
};
const USER_TYPES = {
	GOOGLE: 'google',
	EMAIL: 'email',
	GUEST: 'guest',
};
const ROOM_STATUSES = {
	READY: 'ready',
	VOTING: 'voting',
	CONCLUDED: 'concluded',
};
const ROOM_NAME_DEFAULT = 'Planning poker game';

export { ROOM_NAME_DEFAULT, ROOM_STATUSES, USER_TYPES, VOTING_SYSTEM };
