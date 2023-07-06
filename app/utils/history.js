import { EXTRA_VOTE } from '../../constants/db.constants';

export const getVoteSummary = (votes) => {
  let [results, voteOnTotal, playerResults] = ['', '', ''];
  let [voteCount, numbericVoteCount, voteSum] = [0, 0, 0];
  let coffeeTime = false;

  votes.forEach((userVoting) => {
    if (userVoting.vote) {
      voteCount += 1;
      playerResults += `${userVoting.username} (${userVoting.vote}), `;
      if (userVoting.vote === EXTRA_VOTE.COFFEE) coffeeTime = true;
      else if (userVoting.vote !== EXTRA_VOTE.QUESTION_MARK) {
        numbericVoteCount += 1;
        voteSum += parseInt(userVoting.vote);
      }
    }
  });

  voteOnTotal = `${voteCount}/${votes.length}`;
  if (numbericVoteCount === 0) {
    results = coffeeTime ? EXTRA_VOTE.COFFEE : EXTRA_VOTE.QUESTION_MARK;
  } else {
    results = `${voteSum / numbericVoteCount}`;
  }

  return { results, voteOnTotal, playerResults, coffeeTime };
};
