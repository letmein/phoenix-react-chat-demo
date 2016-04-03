import React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { UserList, MessageList, ChatInput, Autoscroller } from "../../components"

import { sendMessage } from "../../actions/messages"

const Chat = (props) => {
  const { 
    currentUser,
    usersOnline,
    typingUserIds,
    messages,
    channel,
    dispatch
  } = props

  const onSubmit = (text) => {
    dispatch(sendMessage(channel, currentUser, text))
  }

  const onTyping = () => {
    channel.push("user-typing", { id: currentUser.id })
  }

  return (
    <div className="chat">
      <div className="chat__sidebar">
        <UserList users={usersOnline} typingUserIds={typingUserIds} />
      </div>
      <div className="chat__main">
        <Autoscroller className="chat__message-list">
          <MessageList messages={messages}/>
        </Autoscroller>
        <div className="chat__message-input">
          <ChatInput onSubmit={onSubmit} onTyping={onTyping}/>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const userStore     = state.entities.users
  const onlineUserIds = _.without(state.usersOnline, state.currentUserId)
  const messageStore  = state.entities.messages

  const typingUserIds = state.usersTyping
  const usersOnline = _.pick(userStore, onlineUserIds)

  const currentUser    = userStore[state.currentUserId]
  const channel        = state.userSocket.channels.lobby
  const messages       = _.chain(messageStore).map(message => {
    return _.merge({}, message, { user: userStore[message.user_id] })
  }).orderBy(['sent_at', 'desc']).value()
 
  return { currentUser, usersOnline, typingUserIds, channel, messages }
}

export default connect(mapStateToProps)(Chat)
