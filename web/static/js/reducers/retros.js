import { combineReducers } from "redux"
import { handleActions } from "redux-actions"
import { List } from "immutable"
import _ from "lodash"

import { CREATE_RETRO_SUCCESS } from "app/actions/retros/create"
import {
  FETCH_RETROS_REQUEST,
  FETCH_RETROS_SUCCESS,
  FETCH_RETROS_FAILURE
} from "app/actions/retros/fetch"

export default handleActions({
  FETCH_RETROS_SUCCESS: (state, action) => {
    return List(action.payload.items)
  },
  CREATE_RETRO_SUCCESS: (state, action) => {
    let newRetro   = action.payload
    let collection = state.toJS()
    if (_.some(collection, { uuid: newRetro.uuid })) {
      return state
    } else {
      return state.push(newRetro)
    }
  }
}, List())
