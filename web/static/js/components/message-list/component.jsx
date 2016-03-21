import React from "react"
import _ from "lodash"

import { UserAvatar } from ".." 

export default (props) => {
  const { messages } = props
  const messageList = _.map(messages, message => (
    <li className="message-list__message" key={message.id}>
      <UserAvatar imageUrl={message.user.avatar_url} className="message-list__avatar"/>
      <span className="message-list__username">{message.user.login}</span>
      <br/>
      <span className="message-list__message-body">{message.text}</span>
    </li>
  ))
  return (
    <ul className="message-list">{messageList}</ul>
  )
}
