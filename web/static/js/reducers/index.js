import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import entities from "./entities"
import userSocket from "./user-socket"
import currentUserId from "./current-user"
import usersOnline from "./users-online"
import usersTyping from "./users-typing"

export default combineReducers({
  entities,
  currentUserId,
  usersOnline,
  usersTyping,
  userSocket,
  routing: routerReducer
})
