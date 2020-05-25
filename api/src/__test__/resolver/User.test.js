const User = require('../../resolver/User')
const SessionRepository = require('../../repository/SessionRepository')

describe('User type resolver', () => {
  it('Should resolve user fields correctly', async () => {
    const sessions = [{ id: 'session-0' }]
    SessionRepository.getSessionsOfUser = jest.fn().mockImplementation(() => sessions)

    const user = {
      name: 'alice',
      email: 'alice@google.com'
    }

    expect(User.name(user)).toBe(user.name)
    expect(User.email(user)).toBe(user.email)
    expect(User.sessions(user, {}, {repo:{}})).toEqual(sessions)
  })
})
