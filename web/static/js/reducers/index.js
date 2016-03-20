import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import loading from "./loading"
import entities from "./entities"
import userSocket from "./user-socket"
import currentRetro from "./current-retro"
import currentUserId from "./current-user"
import usersOnline from "./users-online"

export default combineReducers({
  entities,
  loading,
  currentRetro,
  currentUserId,
  usersOnline,
  userSocket,
  routing: routerReducer
})
