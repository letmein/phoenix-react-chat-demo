import { combineReducers } from "redux"
import { routeReducer } from "react-router-redux"

import { retros } from "./retros"

export const reducers = combineReducers({
  retros,
  routing: routeReducer
})
