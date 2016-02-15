import "phoenix_html"
import React from "react"
import { render } from "react-dom"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, browserHistory } from "react-router"
import { syncHistory } from "react-router-redux"

require("normalize.css/normalize.css")
require("react-bem-grid/dist/Grid.css")
require("main.scss")

import reducers from "app/reducers/index"
import Home from "app/containers/home"
import Retro from "app/containers/retro"
import Root from "app/containers/root.jsx"
import { initUserSocket } from "app/actions/user-socket"

const loggerMiddleware      = createLogger()
const reduxRouterMiddleware = syncHistory(browserHistory)

const createStoreWithMiddleware = applyMiddleware(
  reduxRouterMiddleware,
  thunkMiddleware,
  loggerMiddleware
)(createStore)

let store = createStoreWithMiddleware(reducers)

const { userToken, userId } = window

if (userToken && userId) {
  store.dispatch(initUserSocket(userToken, userId))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Root}>
        <IndexRoute component={Home}/>
        <Route path="retro/:uuid" component={Retro}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
)
