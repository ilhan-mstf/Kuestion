const UserRepository = require('../repository/UserRepository')
const QuestionRepository = require('../repository/QuestionRepository')
const VoteRepository = require('../repository/VoteRepository')

module.exports = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt + "",
  title: (parent) => parent.title,
  description: (parent) => parent.description,
  postedBy: (parent, args, context) => {
    return UserRepository.getUser(context.repo, parent.email)
  },
  questions: (parent, args, context) => {
    return QuestionRepository.getQuestionsOfSession(context.repo, parent.id)
  },
  votesOfCurrentUser: (parent, args, context) => {
    return VoteRepository.getSessionVotesOfCurrentUser(context.repo, parent.id, parent.email)
  },
  totalQuestionCount: (parent) => parent.totalQuestionCount,
  totalVoteCount: (parent) => parent.totalVoteCount
}
