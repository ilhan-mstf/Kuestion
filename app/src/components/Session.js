import React, { Component } from 'react'
import CreateQuestion from './CreateQuestion'
import QuestionItem from './QuestionItem'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const SESSION_QUERY = gql`
  query Session ($id: ID!) {
    session(id: $id) {
      id
      title
      description
      createdAt
      postedBy {
        name
      }
      questions {
        id
        createdAt
        text
        voteCount
      }
    }
  }
`

class Session extends Component {
  constructor(props) {
    super(props)

    this.updateQuestions = this.updateQuestions.bind(this)
  }

  updateQuestions(questions) {
    this.setState({
      questions: questions
    })
  }

  state = {
    sessionExist: false,
    questions: []
  }

  render () {
    const { id } = this.props.match.params
    const { sessionExist, questions } = this.state

    return (
      <div>
        <Query 
          query={SESSION_QUERY}
          variables={{ id }}
          onCompleted={(data) => this.setState({ 
            sessionExist: data.session !== null, 
            questions: data.session ? data.session.questions : []
          })}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>
            return (sessionExist &&
              <div>
                <h1>{data.session.title}</h1>
                <p className="gray">by {data.session.postedBy.name} | z time ago</p>
                <p>{data.session.description}</p>
              </div>
            )
          }}
        </Query>
        
        {sessionExist ? 
        (
          <div>
            {questions.map((item, index) => (
              <QuestionItem 
                key={item.id} 
                item={item} 
                sessionId={id}
                index={index}
                updateQuestions={this.updateQuestions} />
            ))}

            <CreateQuestion 
              sessionId={id}
              updateQuestions={this.updateQuestions} />
          </div>
        ) : (
          <div>No such session</div>
        )}
      </div>
    )
  }
}

export default Session