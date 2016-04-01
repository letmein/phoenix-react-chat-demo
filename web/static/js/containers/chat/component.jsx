import React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { UserList, MessageList, ChatInput, Autoscroller } from "../../components"

import { sendMessage } from "../../actions/messages"

const Chat = (props) => {
  const { currentUser, usersOnline, messages, channel, dispatch } = props

  const onSubmit = (text) => {
    dispatch(sendMessage(channel, currentUser, text))
  }

  return (
    <div className="chat">
      <div className="chat__sidebar">
        <UserList users={usersOnline} />
      </div>
      <div className="chat__main">
        <Autoscroller className="chat__message-list">
          <MessageList messages={messages}/>
        </Autoscroller>
        <div className="chat__message-input">
          <ChatInput onSubmit={onSubmit}/>
        </div>
      </div>
    </div>
  )
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

export default connect(mapStateToProps)(Chat)
