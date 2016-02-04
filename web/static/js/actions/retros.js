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

export const fetchRetrosRequest = createAction(actions.FETCH_RETROS_REQUEST)
export const fetchRetrosSuccess = createAction(actions.FETCH_RETROS_SUCCESS)
export const fetchRetrosFailure = createAction(actions.FETCH_RETROS_FAILURE)

export function fetchRetros() {
  return dispatch => {
    dispatch(fetchRetrosRequest())

    lobbyChannel.join()
      .receive("ok", resp => {
        dispatch(fetchRetrosSuccess(resp))
      })
      .receive("error", resp => {
        dispatch(fetchRetrosFailure())
      })

    lobbyChannel.on("new:retrospective", resp => {
      dispatch(createRetroSuccess(resp))
    })
  }
}
