import { Component } from "react"
import { connect } from "react-redux"

import template from "./home.rt.jade"
import { createRetro } from 'app/actions'

class Home extends Component {
  onButtonClick = (ev) => {
    const { dispatch } = this.props
    dispatch(createRetro())
  };
}
Home.prototype.render = template

export default connect((state) => state)(Home)
