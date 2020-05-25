const Mutation = require('../../resolver/Mutation')
const SessionRepository = require('../../repository/SessionRepository')
const QuestionRepository = require('../../repository/QuestionRepository')
const VoteRepository = require('../../repository/VoteRepository')
const Authentication = require('../../authentication')

describe('Mutation type resolver', () => {
  it('Should create session when logged in', async () => {
    const session = {
      title: 'a',
      description: 'b'
    }
    SessionRepository.createSession = jest.fn().mockImplementationOnce(() => session)
    Authentication.getEmail = jest.fn().mockImplementationOnce(() => 'user@google.com')

    expect(Mutation.createSession({}, { title: 'a', describe: 'b' }, {})).toEqual(session)
  })

  it('Should fail to create session when not logged in', async () => {
    expect(Mutation.createSession({}, { title: 'a', describe: 'b' }, {})).toEqual(undefined)
  })

  it('Should update session when logged in', async () => {
    const session = {
      id: 'session-0',
      title: 'a',
      description: 'b'
    }
    SessionRepository.updateSession = jest.fn().mockImplementationOnce(() => session)
    Authentication.getUserId = jest.fn().mockImplementationOnce(() => 'user@google.com')

    expect(Mutation.updateSession({}, { id:'session-0', title: 'a', describe: 'b' }, {})).toEqual(session)
  })

  it('Should fail to update session when not logged in', async () => {
    expect(Mutation.createSession({}, { id:'session-0', title: 'a', describe: 'b' }, {})).toEqual(undefined)
  })

  it('Should create question when logged in', async () => {
    const question = {
      id: 'question-0',
      text: 'Where is my mind?'
    }
    QuestionRepository.createQuestion = jest.fn().mockImplementationOnce(() => question)
    Authentication.getUserId = jest.fn().mockImplementationOnce(() => 'user-0')

    expect(Mutation.createQuestion({}, { text: 'Where is my mind?' }, {})).toEqual(question)
  })

  it('Should fail to create question when not logged in', async () => {
    expect(Mutation.createQuestion({}, { text: 'Where is my mind?' }, {})).toEqual(undefined)
  })

  it('Should create vote when logged in', async () => {
    const vote = {
      userId: 'user-0',
      questionId: 'question-0',
      sessionId: 'session-0'
    }
    VoteRepository.createVote = jest.fn().mockImplementationOnce(() => vote)
    Authentication.getUserId = jest.fn().mockImplementationOnce(() => 'user-0')

    expect(Mutation.vote({}, { questionId: 'question-0', sessionId: 'session-0' }, {})).toEqual(vote)
  })

  it('Should fail to create vote when not logged in', async () => {
    expect(Mutation.vote({}, { questionId: 'question-0', sessionId: 'session-0' }, {})).toEqual(undefined)
  })
})
