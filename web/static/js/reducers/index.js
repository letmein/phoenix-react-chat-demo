import { combineReducers } from "redux"
import { routeReducer } from "react-router-redux"

import loading from "./loading"
import entities from "./entities"
import currentRetro from "./current-retro"

export default combineReducers({
  entities,
  loading,
  currentRetro,
  routing: routeReducer
})
