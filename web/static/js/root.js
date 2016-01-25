import React, { Component } from "react"
import { Router, Route } from "react-router"
import Home from "containers/home"

class Root extends Component {
  render() {
    return React.createElement(Router, {},
      React.createElement(Route, { path: "/", component: Home })
    )
  }
}

export default Root
