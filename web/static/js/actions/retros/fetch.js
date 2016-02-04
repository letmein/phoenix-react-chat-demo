import { createAction } from "redux-actions"

import * as actions from "app/actions"
import { lobbyChannel } from "app/channels"
import { createRetroSuccess } from "app/actions/retros/create"

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
