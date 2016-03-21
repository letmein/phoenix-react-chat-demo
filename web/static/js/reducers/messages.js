import { handleActions } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "../action-types"

const defaultState = []

export default handleActions({
  [ActionTypes.RECEIVE_MESSAGE]: (state, action) => {
    return _.concat([action.payload], state)
  }
}, defaultState)
