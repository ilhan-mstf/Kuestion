import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { SESSION_LIST_QUERY } from './SessionList'

const CREATE_SESSION_MUTATION = gql`
  mutation CreateSessionMutation($title: String!, $description: String!) {
    createSession(title: $title, description: $description) {
      id
      title
      description
      createdAt
    }
  }
`

class CreateSession extends Component {
  state = {
    title: '',
    description: ''
  }

  render() {
    const { title, description } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
            type="text"
            placeholder="Title of the session"
          />
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="Description of the session"
          />
        </div>
        <Mutation 
          mutation={CREATE_SESSION_MUTATION} 
          variables={{ title, description }}
          onCompleted={() => this.props.history.push('/')}
          update={(store, { data: { createSession } }) => {
            this._updateSessionListData(store, createSession)
          }}
        >
          {createSessionMutation => <button onClick={createSessionMutation} disabled={title === '' || description === ''}>Submit</button>}
        </Mutation>
      </div>
    )
  }

  _updateSessionListData (store, createSession) {
    const data = store.readQuery({ query: SESSION_LIST_QUERY })
    if (data.user) {
      data.user.sessions.push(createSession)
      store.writeQuery({
        query: SESSION_LIST_QUERY,
        data
      })
    }
  }
}

export default CreateSession