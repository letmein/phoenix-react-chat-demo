import { handleActions } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "../action-types"

const defaultState = []

export default handleActions({
  [ActionTypes.GO_ONLINE]: (state, action) => {
    const userIds = action.payload
    return _.union(state, userIds)
  },
  [ActionTypes.GO_OFFLINE]: (state, action) => {
    const userId = action.payload
    return _.without(state, userId)
  }
}, defaultState)
