import { handleActions } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "../action-types"

const defaultState = []

export default handleActions({
  [ActionTypes.GO_ONLINE]: (state, action) => {
    const ids = _.map(action.payload, parseInt)
    return _.union(state, ids)
  },
  [ActionTypes.GO_OFFLINE]: (state, action) => {
    const ids = _.map(action.payload, parseInt)
    return _.difference(state, ids)
  }
}, defaultState)
