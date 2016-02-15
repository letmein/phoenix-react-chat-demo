import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import _ from "lodash"

import { createRetro } from 'app/actions/retros'
import RetroList from "app/components/retro-list"

class Home extends Component {
  onButtonClick = (ev) => {
    this.props.dispatch(createRetro())
  };

  render() {
    return (
      <div>
        <RetroList items={this.props.retros}/>

        <p>
          <button onClick={this.onButtonClick}>Create a Retrospective</button>
        </p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const retros = _.values(state.entities.retros)
  return { retros }
}

export default connect(mapStateToProps)(Home)
