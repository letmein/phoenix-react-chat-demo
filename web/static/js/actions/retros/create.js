import { createAction } from "redux-actions"
import * as uuid from "node-uuid"

import * as actions from "app/actions"
import { lobbyChannel } from "app/channels"

export const createRetroRequest = createAction(actions.CREATE_RETRO_REQUEST)
export const createRetroSuccess = createAction(actions.CREATE_RETRO_SUCCESS)
export const createRetroFailure = createAction(actions.CREATE_RETRO_FAILURE)

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
