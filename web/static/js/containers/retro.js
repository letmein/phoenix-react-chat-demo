import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { findCurrentRetro } from 'app/actions/retros'

class Retro extends Component {
  componentDidMount = () => {
    // TODO
  };

  render() {
    return (
      <div>Retro details</div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // TODO
  return {}
}

export default connect(mapStateToProps)(Retro)
