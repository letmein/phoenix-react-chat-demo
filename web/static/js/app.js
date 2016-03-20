import "phoenix_html"
import React from "react"
import { render } from "react-dom"
import thunkMiddleware from "redux-thunk"
import createLogger from "redux-logger"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"

require("normalize.css/normalize.css")
require("react-bem-grid/dist/Grid.css")
require("app.scss")

import reducers from "./reducers/index"
import Home from "./containers/home"
import Retro from "./containers/retro"
import Root from "./containers/root.jsx"
import { initUserSocket } from "./actions/user-socket"

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

const store = createStoreWithMiddleware(reducers)

const history = syncHistoryWithStore(browserHistory, store)

const { userToken, userId } = window

if (userToken && userId) {
  store.dispatch(initUserSocket(userToken, userId))
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Root}>
        <IndexRoute component={Home}/>
        <Route path="retro/:uuid" component={Retro}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
)
