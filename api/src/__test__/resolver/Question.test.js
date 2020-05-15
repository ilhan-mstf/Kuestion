const Question = require('../../resolver/Question')

describe('Question type resolver', () => {
  it('Should resolve question fields correctly', async () => {
    const question = {
      id: 'question-0',
      createdAt: new Date().getTime(),
      text: 'Where is m mind?',
      voteCount: 5
    }

    expect(Question.id(question)).toBe(question.id)
    expect(Question.createdAt(question)).toBe(question.createdAt + "")
    expect(Question.text(question)).toBe(question.text)
    expect(Question.voteCount(question)).toEqual(question.voteCount)
  })
})
