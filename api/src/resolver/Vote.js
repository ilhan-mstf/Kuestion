const QuestionRepository = require('../repository/QuestionRepository')
const UserRepository = require('../repository/UserRepository')

module.exports = {
  id: (parent) => parent.questionIdEmail,
  question: (parent, args, context) => QuestionRepository.getQuestion(context.repo, parent.questionId),
  user: (parent, args, context) => UserRepository.getUser(context.repo, parent.email)
}
