import { handleActions } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "../action-types"

const defaultState = []

export default handleActions({
  [ActionTypes.GO_ONLINE]: (state, action) => {
    return _.union(state, action.payload)
  },
  [ActionTypes.GO_OFFLINE]: (state, action) => {
    return _.difference(state, action.payload)
  }
}, defaultState)
