import { combineReducers } from "redux"
import { handleActions } from "redux-actions"

import * as ActionTypes from "../action-types"

let retros = handleActions({
  [ActionTypes.FETCH_RETROS_REQUEST]: () => (true),
  [ActionTypes.FETCH_RETROS_SUCCESS]: () => (false),
  [ActionTypes.FETCH_RETROS_FAILURE]: () => (false)
}, true)

export default combineReducers({ retros })
