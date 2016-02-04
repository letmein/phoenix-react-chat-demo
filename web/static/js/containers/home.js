import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import { createRetro } from 'app/actions/retros/create'
import RetroList from "app/components/retro-list"

class Home extends Component {
  onButtonClick = (ev) => {
    this.props.dispatch(createRetro())
  };
  render() {
    return (
      <div>
        <h1>Home Page!</h1>

        <p>
          <Link to="/">Home</Link>
        </p>

        <RetroList items={this.props.retros}/>

        <p>
          <button onClick={this.onButtonClick}>Create a Retrospective</button>
        </p>
      </div>
    )
  }
}

function select(state) {
  let retros = state.entities.retros.toJS()
  return { retros }
}

export default connect(select)(Home)
