import { handleActions } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "app/actions"

const defaultState = null

export default handleActions({
  [ActionTypes.SET_CURRENT_RETRO]: (state, action) => {
    return action.payload
  }
}, defaultState)
