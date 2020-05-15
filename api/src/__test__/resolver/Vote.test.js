const Vote = require('../../resolver/Vote')
const QuestionRepository = require('../../repository/QuestionRepository')
const UserRepository = require('../../repository/UserRepository')

describe('Vote type resolver', () => {
  it('Should resolve vote fields correctly', async () => {
    const question = { id: 'question-0' }
    QuestionRepository.getQuestion = jest.fn().mockImplementation(() => question)

    const user = { id: 'user-0' }
    UserRepository.getUser = jest.fn().mockImplementation(() => user)

    const vote = {
      questionId: 'question-0',
      userId: 'user-0'
    }

    expect(Vote.question(vote)).toEqual(question)
    expect(Vote.user(vote)).toEqual(user)
  })
})
