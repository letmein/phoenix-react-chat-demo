import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import entities from "./entities"
import userSocket from "./user-socket"
import currentUserId from "./current-user"
import currentMessage from "./current-message"
import usersOnline from "./users-online"
import messages from "./messages"

export default combineReducers({
  entities,
  currentUserId,
  usersOnline,
  userSocket,
  currentMessage,
  messages,
  routing: routerReducer
})
