import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN, EMAIL } from '../constants'
import { client } from '../index' 

class Header extends Component {
  render () {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const email = localStorage.getItem(EMAIL)
    return (
      <div className='flex pa1 justify-between nowrap bg-navy white'>
        <div className='flex flex-fixed'>
          <div className='fw7 mr1'>KUESTION</div>
          <Link to='/' className='ml1 white'>
            home
          </Link>
          {authToken && (
            <div className='flex'>
              <div className='ml1'>|</div>
              <Link to='/create_session' className='ml1 white'>
                create session
              </Link>
            </div>
          )}
        </div>
        <div className='flex flex-fixed'>
          {authToken ? (
            <div className="flex">
              <div className='ml1'>{email}</div>
              <div className='ml1'>|</div>
              <div
                className='ml1 pointer underline white'
                onClick={() => {
                  client.resetStore()
                  localStorage.removeItem(AUTH_TOKEN)
                  localStorage.removeItem(EMAIL)
                  this.props.history.push(`/`)
                }}
              >
                logout
              </div>
            </div>
          ) : (
            <Link to='/login' className='ml1 white'>
              login
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
