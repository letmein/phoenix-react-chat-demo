import { combineReducers } from "redux"
import { handleActions } from "redux-actions"

import * as ActionTypes from "app/actions"

const socket = handleActions({
  [ActionTypes.OPEN_USER_SOCKET]: (state, action) => {
    return action.payload
  },
  [ActionTypes.CLOSE_USER_SOCKET]: () => (null)
}, null)

const userChannel = handleActions({
  [ActionTypes.JOIN_USER_CHANNEL]: (state, action) => {
    return action.payload
  },
}, null)

const channels = combineReducers({
  user: userChannel
})

export default combineReducers({ socket, channels })
