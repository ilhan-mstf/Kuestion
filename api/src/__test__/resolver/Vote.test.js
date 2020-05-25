const Vote = require('../../resolver/Vote')
const QuestionRepository = require('../../repository/QuestionRepository')
const UserRepository = require('../../repository/UserRepository')

describe('Vote type resolver', () => {
  it('Should resolve vote fields correctly', async () => {
    const question = { id: 'question-0' }
    QuestionRepository.getQuestion = jest.fn().mockImplementation(() => question)

    const user = { email: 'user@google.com' }
    UserRepository.getUser = jest.fn().mockImplementation(() => user)

    const vote = {
      questionId: 'question-0',
      email: 'user@google.com'
    }

    expect(Vote.question(vote, {}, {repo:{}})).toEqual(question)
    expect(Vote.user(vote, {}, {repo:{}})).toEqual(user)
  })
})
