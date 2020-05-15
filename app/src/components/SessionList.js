import React, { Component } from 'react'
import SessionItem from './SessionItem'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const SESSION_LIST_QUERY = gql`
  {
    user {
      sessions {
        id
        title
        description
        createdAt
        totalQuestionCount
        totalVoteCount
      }
    }
  }
`

class SessionList extends Component {
  render () {
    return (
      <Query query={SESSION_LIST_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const itemsToRender = data.user ? data.user.sessions : []

          return (
            <div>
              {itemsToRender.map((item, index) => (
                <SessionItem 
                  key={item.id} 
                  item={item} 
                  index={index} />
              ))}
              {itemsToRender.length === 0 && (
                <p>You don't have any session yet.</p>
              )}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default SessionList
