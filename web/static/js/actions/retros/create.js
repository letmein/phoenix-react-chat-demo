import { createAction } from "redux-actions"
import * as uuid from "node-uuid"

import { lobbyChannel } from "app/channels"

export const CREATE_RETRO_REQUEST = "CREATE_RETRO_REQUEST"
export const CREATE_RETRO_SUCCESS = "CREATE_RETRO_SUCCESS"
export const CREATE_RETRO_FAILURE = "CREATE_RETRO_FAILURE"

export const createRetroRequest = createAction(CREATE_RETRO_REQUEST)
export const createRetroSuccess = createAction(CREATE_RETRO_SUCCESS)
export const createRetroFailure = createAction(CREATE_RETRO_FAILURE)

export function createRetro(dueDate = new Date()) {
  return dispatch => {
    dispatch(createRetroRequest())

    let payload = { uuid: uuid.v1(), due_on: dueDate }

    lobbyChannel.push("new:retrospective", payload)
      .receive("ok", resp => {
        dispatch(createRetroSuccess(resp))
      })
      .receive("error", resp => {
        dispatch(createRetroFailure())
      })
  }
}
