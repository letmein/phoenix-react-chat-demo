import React, { Component } from "react"
import _ from "lodash"

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }

    this.onTyping = _.debounce(props.onTyping, 500)
  }

  onChange = event => {
    this.setState({ value: event.target.value })
  };

  onKeyPress = event => {
    const { onSubmit } = this.props
    const value = _.trim(event.target.value)
    if (!_.isEmpty(value) && event.key == "Enter" && !event.shiftKey) {
      onSubmit(value)
      this.setState({ value: "" })
    }
    this.onTyping()
  };

  render() {
    const { value } = this.state
    const { className } = this.props
    return (
      <textarea
        className={`chat-input ${className}`}
        value={value}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
      />
    )
  }
}
