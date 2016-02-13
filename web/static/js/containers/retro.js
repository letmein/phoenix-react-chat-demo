import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { findCurrentRetro } from 'app/actions/retros'

class Retro extends Component {
  componentWillMount = () => {
    this.props.dispatch(findCurrentRetro(this.props.params.uuid))
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
