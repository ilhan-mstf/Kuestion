const UserRepository = require('../repository/UserRepository')
const QuestionRepository = require('../repository/QuestionRepository')
const VoteRepository = require('../repository/VoteRepository')

module.exports = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt + "",
  title: (parent) => parent.title,
  description: (parent) => parent.description,
  postedBy: (parent) => UserRepository.getUser(parent.userId),
  questions: (parent) => QuestionRepository.getQuestionsOfSession(parent.id),
  votesOfCurrentUser: (parent) => VoteRepository.getSessionVotesOfCurrentUser(parent.id, parent.userId),
  totalQuestionCount: (parent) => QuestionRepository.getQuestionCountOfSession(parent.id),
  totalVoteCount: (parent) => VoteRepository.getVoteCountOfSession(parent.id)
}
