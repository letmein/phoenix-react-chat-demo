import { handleActions } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "../action-types"

const defaultState = []

export default handleActions({
  [ActionTypes.START_TYPING]: (state, action) => {
    const userId = action.payload
    return _.concat(state, userId)
  },
  [ActionTypes.FINISH_TYPING]: (state, action) => {
    const userId = action.payload
    return _.without(state, userId)
  }
}, defaultState)
