import { combineReducers } from "redux"
import { routeReducer } from "react-router-redux"

import loading from "./loading"
import entities from "./entities"

export default combineReducers({
  entities,
  loading,
  routing: routeReducer
})
