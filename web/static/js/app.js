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
require("app.scss")

import reducers from "./reducers/index"
import Root from "./containers/root.jsx"
import { initUserSocket } from "./actions/user-socket"

let middleware = [thunkMiddleware]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

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
      </Route>
    </Router>
  </Provider>,
  document.getElementById("container")
)
