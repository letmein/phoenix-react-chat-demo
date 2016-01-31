import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { fetchRetros } from "app/actions/retros/fetch"

class Root extends Component {
  componentDidMount = () => {
    this.props.dispatch(fetchRetros())
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <div>
          <div>{this.props.children}</div>
        </div>
      )
    }
  }
}

function select(state) {
  return _.pick(state, ['isLoading'])
}

export default connect(select)(Root)
