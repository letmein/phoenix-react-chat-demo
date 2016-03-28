import React from "react"
import _ from "lodash"
import moment from "moment"

import { UserAvatar } from ".." 


function TimeStamp(props) {
  const { value, className } = props
  const formatted = moment(value).format("llll")
  return (<span className={className}>{formatted}</span>)
}

export default (props) => {
  const { messages, className } = props
  const messageList = _.map(messages, message => (
    <li className="message-list__message" key={message.id}>
      <UserAvatar imageUrl={message.user.avatar_url} className="message-list__avatar"/>
      <span className="message-list__username">{message.user.login}</span>
      @
      <TimeStamp className="message-list_time" value={message.sent_at}/>
      <br/>
      <span className="message-list__message-body">{message.text}</span>
    </li>
  ))
  return (
    <ul className={`message-list ${className}`}>{messageList}</ul>
  )
}
