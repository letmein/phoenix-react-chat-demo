import "phoenix_html"
import React from "react"
import { render } from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"


// import socket from "./socket"

import { retroRedux } from "./reducers"
import Root from "containers/root"

let store = createStore(retroRedux)

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

render(
  React.createElement(Provider, { store },
    React.createElement(Root)
  ),
  document.getElementById("root")
)
