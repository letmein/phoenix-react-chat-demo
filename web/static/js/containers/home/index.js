import { Component } from "react"
import { connect } from "react-redux"

import { createRetro } from 'app/actions'
import template from "./home.rt.jade"

class Home extends Component {
  onButtonClick = (ev) => {
    this.props.dispatch(createRetro())
  };
}
Home.prototype.render = template

export default connect((state) => state)(Home)
