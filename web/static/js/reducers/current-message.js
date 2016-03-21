import { handleActions } from "redux-actions"

import * as ActionTypes from "../action-types"

const defaultState = null

export default handleActions({
  [ActionTypes.SEND_MESSAGE_REQUEST]: (state, action) => {
    return action.payload
  },
  [ActionTypes.SEND_MESSAGE_SUCCESS]: (state, action) => {
    return defaultState
  }
}, defaultState)
