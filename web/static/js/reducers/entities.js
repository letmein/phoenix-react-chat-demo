import { handleActions } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "../action-types"

const defaultState = { retros: {}, users: {} }

export default handleActions({
  [ActionTypes.UPDATE_ENTITIES]: (state, action) => {
    return _.merge({}, state, action.payload)
  }
}, defaultState)
