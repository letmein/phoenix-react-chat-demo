import { combineReducers } from "redux"
import { routeReducer } from "react-router-redux"

import retros from "./retros"
import loading from "./loading"

const entities = combineReducers({ retros })

export default combineReducers({
  entities,
  loading,
  routing: routeReducer
})
