import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SessionItem extends Component {
  render () {
    return (
      <div className='flex mt2 items-start'>
        <div className='flex items-center'>
          <span className='gray'>{this.props.index + 1}.</span>
        </div>
        <div className='ml1'>
          <div>
            <Link to={`/session/${this.props.item.id}`} className='ml1 black'>
              {this.props.item.title}
            </Link>
          </div>
          <div className='f6 lh-copy gray'>
            {this.props.item.totalQuestionCount} questions | {this.props.item.totalVoteCount} votes
          </div>
        </div>
      </div>
    )
  }
}

export default SessionItem
