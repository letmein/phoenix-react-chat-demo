import { handleActions } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "../action-types"

const defaultState = null

export default handleActions({
  [ActionTypes.AUTHENTICATE_USER]: (state, action) => {
    const userId = action.payload
    return userId
  }
}, defaultState)
