import { combineReducers } from "redux"
import { handleActions } from "redux-actions"

import * as ActionTypes from "../action-types"

const socket = handleActions({
  [ActionTypes.OPEN_USER_SOCKET]: (state, action) => {
    return action.payload
  },
  [ActionTypes.CLOSE_USER_SOCKET]: () => (null)
}, null)

const lobby = handleActions({
  [ActionTypes.CREATE_LOBBY_CHANNEL]: (state, action) => {
    return action.payload
  },
}, null)

const channels = combineReducers({ lobby })

export default combineReducers({ socket, channels })
