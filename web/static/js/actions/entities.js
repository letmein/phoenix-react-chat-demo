import { createAction } from "redux-actions"
import _ from "lodash"

import * as ActionTypes from "../action-types"

// Transform
//   { users: [{id: "a"}, {id: "b"}] }
// to
//   { users: { a: { id: "a" }, b: { id: "b" } } }
export const updateEntities = createAction(ActionTypes.UPDATE_ENTITIES, entityMap => {
  return _.mapValues(entityMap, items => _.keyBy(items, "id"))
})
