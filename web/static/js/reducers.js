import { combineReducers } from "redux"
import { List } from "immutable"

import { CREATE_RETRO, INVITE_USER } from "app/actions"

function retros(state = List(), action) {
  switch (action.type) {
    case CREATE_RETRO:
      return state.push(action.data)
    default:
      return state
  }
}

export const retroRedux = combineReducers({ retros })
