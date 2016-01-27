import "phoenix_html"
import React from "react"
import { render } from "react-dom"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"

// import socket from "./socket"

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

import { retroRedux } from "app/reducers"
import Root from "app/containers/root"

let store = createStoreWithMiddleware(retroRedux)

render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById("root")
)
