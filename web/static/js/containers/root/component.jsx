import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { CurrentUser, LoginLink, UserList, MessageList, ChatInput, Autoscroller } from "../../components"

import { sendMessage } from "../../actions/messages"

class Root extends Component {
  createOnSubmit() {
    const { dispatch, currentUser, channel } = this.props
    return function(text) {
      dispatch(sendMessage(channel, currentUser, text))
    }
  };

  render() {
    const { currentUser, usersOnline, messages } = this.props

    if (_.isEmpty(currentUser)) {
      return ( <LoginLink/> )
    } else {
      return (
        <div className="root">
          <div className="root__header">
            <nav className="root__nav">
              <CurrentUser user={currentUser}/>
            </nav>
          </div>
          <div className="root__main">
            <div className="root__sidebar">
              <UserList users={usersOnline} />
            </div>
            <div className="root__messages">
              <Autoscroller className="root__message-list">
                <MessageList messages={messages}/>
              </Autoscroller>
              <div className="root__message-input">
                <ChatInput onSubmit={this.createOnSubmit()}/>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  const userStore = state.entities.users
  const userIds   = _.without(state.usersOnline, state.currentUserId)
  const messageStore = state.entities.messages

  const currentUser    = userStore[state.currentUserId]
  const usersOnline    = _.pick(userStore, userIds)
  const channel        = state.userSocket.channels.lobby
  const messages       = _.chain(messageStore).map(message => {
    return _.merge({}, message, { user: userStore[message.user_id] })
  }).orderBy(['sent_at', 'desc']).value()
 
  return { currentUser, usersOnline, channel, messages }
}

export default connect(mapStateToProps)(Root)
