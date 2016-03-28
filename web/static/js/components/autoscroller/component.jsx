import React, { Component } from "react"
import { findDOMNode } from "react-dom"

export default class extends Component {
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
    const { className, children } = this.props
    return (
      <div className={className}>{children}</div>
    )
  }
}
