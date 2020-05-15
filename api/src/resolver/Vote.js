const QuestionRepository = require('../repository/QuestionRepository')
const UserRepository = require('../repository/UserRepository')

module.exports = {
  question: (parent) => QuestionRepository.getQuestion(parent.questionId),
  user: (parent) => UserRepository.getUser(parent.userId)
}
