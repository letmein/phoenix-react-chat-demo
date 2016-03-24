import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import entities from "./entities"
import userSocket from "./user-socket"
import currentUserId from "./current-user"
import currentMessage from "./current-message"
import usersOnline from "./users-online"

export default combineReducers({
  entities,
  currentUserId,
  usersOnline,
  userSocket,
  currentMessage,
  routing: routerReducer
})
