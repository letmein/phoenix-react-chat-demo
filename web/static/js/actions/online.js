import { createAction } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "../action-types"

export const goOnline  = createAction(ActionTypes.GO_ONLINE, users => {
  return _.chain(users).castArray().map('id').value()
})

export const goOffline = createAction(ActionTypes.GO_OFFLINE, user => user.id)
