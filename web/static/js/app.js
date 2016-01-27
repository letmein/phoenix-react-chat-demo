import "phoenix_html"
import React from "react"
import { render } from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"


// import socket from "./socket"

import { retroRedux } from "app/reducers"
import Root from "app/containers/root"

let store = createStore(retroRedux)

let unsubscribe = store.subscribe(() =>
  console.log(store.getState().retros.toJS())
)

render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById("root")
)
