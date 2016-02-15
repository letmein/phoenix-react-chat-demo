import { combineReducers } from "redux"
import { routeReducer } from "react-router-redux"

import loading from "./loading"
import entities from "./entities"
import userSocket from "./user-socket"
import currentRetro from "./current-retro"
import currentUser from "./current-user"

export default combineReducers({
  entities,
  loading,
  currentRetro,
  currentUser,
  userSocket,
  routing: routeReducer
})
