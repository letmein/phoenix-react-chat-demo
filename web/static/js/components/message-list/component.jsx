import React, { Component } from "react"
import { findDOMNode } from "react-dom"
import _ from "lodash"

import { UserAvatar } from ".." 

export default class MessageList extends Component {
  scrollToBottom = () => {
    const node = findDOMNode(this)
    node.scrollTop = node.scrollHeight
  };

  componentWillUpdate = () => {
    const node = findDOMNode(this)
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
  };
 
  componentDidUpdate = () => {
    if (this.shouldScrollBottom) {
      this.scrollToBottom()
    }
  };

  componentDidMount = () => {
    this.scrollToBottom()
  };

  render() {
    const { messages, className } = this.props
    const messageList = _.map(messages, message => (
      <li className="message-list__message" key={message.id}>
        <UserAvatar imageUrl={message.user.avatar_url} className="message-list__avatar"/>
        <span className="message-list__username">{message.user.login}</span>
        <br/>
        <span className="message-list__message-body">{message.text}</span>
      </li>
    ))
    return (
      <ul className={`message-list ${className}`}>{messageList}</ul>
    )
  }
}
