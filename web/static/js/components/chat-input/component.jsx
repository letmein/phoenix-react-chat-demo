import React, { Component } from "react"

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  };

  handleKeyPress = event => {
    if (event.key == "Enter" && !event.shiftKey) {
      this.props.onSubmit(event.target.value)
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
