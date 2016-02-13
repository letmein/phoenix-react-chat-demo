import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { fetchRetros } from "app/actions/retros"

class Root extends Component {
  componentWillMount = () => {
    this.props.dispatch(fetchRetros())
  };

  render() {
    let innerContent
    if (this.props.loading) {
      innerContent = "Loading..."
    } else {
      innerContent = this.props.children
    }

    return (
      <div>{innerContent}</div>
    )
  }
}

function mapStateToProps(state) {
  return { loading: state.loading.retros } 
}

export default connect(mapStateToProps)(Root)
