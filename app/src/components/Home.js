import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import SessionList from './SessionList'

class Home extends Component {
  render () {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div>
        {authToken ? (
          <SessionList/>
        ) : (
          <section>
            <h1>Collect Questions</h1>
            <h2>For Your Live Question & Anwser Sessions</h2>
            <ul>
              <li>Create a session</li>
              <li>Share it</li>
              <li>Add questions</li>
              <li>Upvote questions</li>
            </ul>
          </section>
        )}
      </div>
    )
  }
}

export default Home
