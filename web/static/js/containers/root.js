import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { fetchRetros } from "app/actions/retros/fetch"

class Root extends Component {
  componentDidMount = () => {
    this.props.dispatch(fetchRetros())
  };

  render() {
    if (this.props.loadingRetros) {
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
  const loadingRetros = state.loading.retros
  return { loadingRetros } 
}

export default connect(select)(Root)
