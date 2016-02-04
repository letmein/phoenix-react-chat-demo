import { combineReducers } from "redux"
import { handleActions } from "redux-actions"

// TODO find a way to use constants
import * as actions from "app/actions"

let retros = handleActions({
  FETCH_RETROS_REQUEST: () => (true),
  FETCH_RETROS_SUCCESS: () => (false),
  FETCH_RETROS_FAILURE: () => (false)
}, false)

export default combineReducers({ retros })
