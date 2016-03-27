import React, { Component } from "react"
import _ from "lodash"

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  };

  handleKeyPress = event => {
    const value = _.trim(event.target.value)
    if (!_.isEmpty(value) && event.key == "Enter" && !event.shiftKey) {
      this.props.onSubmit(value)
      this.setState({ value: "" })
    }
  };

  render() {
    const { value } = this.state
    const { className } = this.props
    return (
      <textarea
        className={className}
        value={value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    )
  }
}
