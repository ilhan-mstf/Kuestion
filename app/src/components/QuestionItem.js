import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { SESSION_QUERY } from './Session'
import { SESSION_LIST_QUERY } from './SessionList'

const VOTE_MUTATION = gql`
  mutation VoteMutation($questionId: ID!, $sessionId: ID!) {
    vote(questionId: $questionId, sessionId: $sessionId) {
      question {
        id
        voteCount
      }
    }
  }
`

class QuestionItem extends Component {
  render () {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const questionId = this.props.item.id
    const sessionId = this.props.sessionId

    return (
      <div className='flex mt2 items-start'>
        <div className='flex items-center'>
          <span className='gray'>{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ questionId: questionId, sessionId: sessionId }}
              update={(store, { data: { vote } }) => {
                this._updateQuestionData(store, sessionId, questionId)
                this._updateSessionListData(store, sessionId)
              }}
              onError={() => {}}
            >
              {voteMutation => (
                <div className='ml1 gray f11' onClick={voteMutation}>
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className='ml1'>
          <div>
            {this.props.item.text}
          </div>
          <div className='f6 lh-copy gray'>
            {this.props.item.voteCount} votes | by hede hüde | x time ago
          </div>
        </div>
      </div>
    )
  }

  _updateQuestionData (store, sessionId, questionId) {
    const queryData = { query: SESSION_QUERY, variables: { id: sessionId } }
    const data = store.readQuery(queryData)

    this.props.updateQuestions(data.session.questions)
  }

  _updateSessionListData (store, sessionId) {
    const queryData = { query: SESSION_LIST_QUERY }
    const data = store.readQuery(queryData)
    const session = data.user.sessions.find(s => s.id === sessionId)
    if (session) {
      session.totalVoteCount += 1

      store.writeQuery({
        query: SESSION_LIST_QUERY,
        data
      })
    }
  }
}

export default QuestionItem
