const Session = require('../../resolver/Session')
const UserRepository = require('../../repository/UserRepository')
const QuestionRepository = require('../../repository/QuestionRepository')
const VoteRepository = require('../../repository/VoteRepository')

describe('Session type resolver', () => {
  it('Should resolve session fields correctly', async () => {
    const questions = [{ id: 'question-0' }]
    QuestionRepository.getQuestionsOfSession = jest.fn().mockImplementation(() => questions)

    const user = { id: 'user-0' }
    UserRepository.getUser = jest.fn().mockImplementation(() => user)

    const votes = [{ id: 'question-0-user-0' }]
    VoteRepository.getSessionVotesOfCurrentUser = jest.fn().mockImplementation(() => votes)

    const vote = {
      id: 'session-0',
      createdAt: new Date().getTime(),
      title: 'title',
      description: 'desc',
      userId: 'user-0'
    }

    expect(Session.id(vote)).toBe(vote.id)
    expect(Session.createdAt(vote)).toBe(vote.createdAt + "")
    expect(Session.title(vote)).toBe(vote.title)
    expect(Session.description(vote)).toBe(vote.description)
    expect(Session.postedBy(vote)).toEqual(user)
    expect(Session.questions(vote)).toEqual(questions)
    expect(Session.votesOfCurrentUser(vote)).toEqual(votes)
  })
})
