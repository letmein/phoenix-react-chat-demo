import { createAction } from "redux-actions"

import * as ActionTypes from "../action-types"

export const goOnline  = createAction(ActionTypes.GO_ONLINE)
export const goOffline = createAction(ActionTypes.GO_OFFLINE)
