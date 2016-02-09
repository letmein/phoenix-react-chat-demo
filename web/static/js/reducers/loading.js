import { combineReducers } from "redux"
import { handleActions } from "redux-actions"

import {
  FETCH_RETROS_REQUEST,
  FETCH_RETROS_SUCCESS,
  FETCH_RETROS_FAILURE
} from "app/actions"

let retros = handleActions({
  [FETCH_RETROS_REQUEST]: () => (true),
  [FETCH_RETROS_SUCCESS]: () => (false),
  [FETCH_RETROS_FAILURE]: () => (false)
}, false)

export default combineReducers({ retros })
