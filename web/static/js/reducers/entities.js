import { handleActions } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "app/actions"

const defaultState = { retros: {} }

export default handleActions({
  [ActionTypes.UPDATE_ENTITIES]: (state, action) => {
    return _.merge({}, state, action.payload)
  }
}, defaultState)
