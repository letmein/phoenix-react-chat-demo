import { createAction } from "redux-actions"
import _ from "lodash"

import { updateEntities } from "./entities"

export function updateUsers(items) {
  return dispatch => {
    const users = _.keyBy(items, "id")
    dispatch(updateEntities({ users }))
  }
}
