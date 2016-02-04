import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"

class Retro extends Component {
  componentDidMount = () => {
    console.log(this.props)
  };

  render() {
    return (
      <div>Retro details</div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  //console.log('STATE:', state, 'ownProps:', ownProps)
  //const uuid       = ownProps.params.uuid
  const collection = state.entities.retros.toJS()
  //const retro      = _.find(collection, { uuid })

  return { collection }
}

export default connect(mapStateToProps)(Retro)
