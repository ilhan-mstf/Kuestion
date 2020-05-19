const Session = require('../../resolver/Session')
const UserRepository = require('../../repository/UserRepository')
const QuestionRepository = require('../../repository/QuestionRepository')
const VoteRepository = require('../../repository/VoteRepository')

describe('Session type resolver', () => {
  it('Should resolve session fields correctly', async () => {
    const questions = [{ id: 'question-0' }]
    QuestionRepository.getQuestionsOfSession = jest.fn().mockImplementation(() => questions)

    const user = { email: 'user@google.com' }
    UserRepository.getUser = jest.fn().mockImplementation(() => user)

    const votes = [{ id: 'question-0-user@google.com' }]
    VoteRepository.getSessionVotesOfCurrentUser = jest.fn().mockImplementation(() => votes)

    const session = {
      id: 'session-0',
      createdAt: new Date().getTime(),
      title: 'title',
      description: 'desc',
      email: 'user@google.com'
    }

    expect(Session.id(session)).toBe(session.id)
    expect(Session.createdAt(session)).toBe(session.createdAt + "")
    expect(Session.title(session)).toBe(session.title)
    expect(Session.description(session)).toBe(session.description)
    expect(Session.postedBy(session, {}, {repo:{}})).toEqual(user)
    expect(Session.questions(session, {}, {repo:{}})).toEqual(questions)
    expect(Session.votesOfCurrentUser(session, {}, {repo:{}})).toEqual(votes)
    expect(Session.totalQuestionCount(session)).toEqual(session.totalQuestionCount)
    expect(Session.totalVoteCount(session)).toEqual(session.totalVoteCount)
  })
})
