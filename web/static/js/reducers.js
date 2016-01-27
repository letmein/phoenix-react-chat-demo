import { combineReducers } from "redux"
import { CREATE_RETRO, INVITE_USER } from "./actions"

function retros(state = [], action) {
  switch (action.type) {
    case CREATE_RETRO:
      return [...state, action.data]
    default:
      return state
  }
}

export const retroRedux = combineReducers({ retros })
