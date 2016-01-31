import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"

class Retro extends Component {
  render() {
    return (
      <div>Retro details</div>
    )
  }
}

function select(state) {
  return state
}

export default connect(select)(Retro)
