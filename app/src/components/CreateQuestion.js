import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { SESSION_QUERY } from './Session'
import { SESSION_LIST_QUERY } from './SessionList'

const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestionMutation($text: String!, $sessionId: ID!) {
    createQuestion(text: $text, sessionId: $sessionId) {
      id
      createdAt
      text
      voteCount
    }
  }
`

class CreateQuestion extends Component {
  state = {
    text: ''
  }

  render() {
    const sessionId = this.props.sessionId
    const { text } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={text}
            onChange={e => this.setState({ text: e.target.value })}
            type="text"
            placeholder="Ask question"
          />
        </div>
        <Mutation 
          mutation={CREATE_QUESTION_MUTATION} 
          variables={{ text, sessionId }}
          onCompleted={() => {
            this.setState({ text: '' })
          }}
          update={(store, { data: { createQuestion } }) => {
            this._updateSessionData(store, createQuestion, sessionId)
            this._updateSessionListData(store, sessionId)
          }}
        >
          {createQuestionMutation => <button onClick={createQuestionMutation} disabled={text === ''}>Submit</button>}
        </Mutation>
      </div>
    )
  }

  _updateSessionData (store, createQuestion, sessionId) {
    const queryData = { query: SESSION_QUERY, variables: { id: sessionId } }
    const data = store.readQuery(queryData)
    data.session.questions.push(createQuestion)
    store.writeQuery({
      query: SESSION_QUERY,
      variables: { id: sessionId },
      data
    })

    this.props.updateQuestions(data.session.questions)
  }

  _updateSessionListData (store, sessionId) {
    const queryData = { query: SESSION_LIST_QUERY }
    const data = store.readQuery(queryData)
    const session = data.user.sessions.find(s => s.id === sessionId)
    if (session) {
      session.totalQuestionCount += 1

      store.writeQuery({
        query: SESSION_LIST_QUERY,
        data
      })
    }
  }
}

export default CreateQuestion