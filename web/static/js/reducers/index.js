import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import entities from "./entities"
import userSocket from "./user-socket"
import currentUserId from "./current-user"
import usersOnline from "./users-online"

export default combineReducers({
  entities,
  currentUserId,
  usersOnline,
  userSocket,
  routing: routerReducer
})
