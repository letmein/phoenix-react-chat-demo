import { combineReducers } from "redux"
import { CREATE_RETRO, INVITE_USER } from "./actions" 

import * as uuid from "node-uuid"

function retros(state = [], action) {
  switch (action.type) {
    case CREATE_RETRO:
      return state.slice().push({ uuid: uuid.v1() })
    default:
      return state
  }
}

export const retroRedux = combineReducers({ retros })
