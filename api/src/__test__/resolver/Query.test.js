const Query = require('../../resolver/Query')
const SessionRepository = require('../../repository/SessionRepository')
const UserRepository = require('../../repository/UserRepository')
const Authentication = require('../../authentication')

describe('Query type resolver', () => {
  it('Should resolve session', async () => {
    const session = { id: 'session-0' }
    SessionRepository.getSession = jest.fn().mockImplementationOnce(() => session)

    expect(Query.session({}, { id: 'session-0' }, { repo: {} })).toEqual(session)
  })

  it('Should resolve user when logged in', async () => {
    const user = { id: 'user-0' }
    UserRepository.getUser = jest.fn().mockImplementationOnce(() => user)
    Authentication.getEmail = jest.fn().mockImplementationOnce(() => 'user@google.com')

    expect(Query.user({}, {}, { repo: {} })).toEqual(user)
  })

  it('Should return no value when nobody logged in', async () => {
    expect(Query.user({}, {}, { repo: {} })).toEqual(undefined)
  })
})
