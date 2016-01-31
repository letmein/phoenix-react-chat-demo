import { createAction } from "redux-actions"

import { lobbyChannel } from "app/channels"
import { createRetroSuccess } from "app/actions/retros/create"

export const FETCH_RETROS_REQUEST = "FETCH_RETROS_REQUEST"
export const FETCH_RETROS_SUCCESS = "FETCH_RETROS_SUCCESS"
export const FETCH_RETROS_FAILURE = "FETCH_RETROS_FAILURE"

export const fetchRetrosRequest = createAction(FETCH_RETROS_REQUEST)
export const fetchRetrosSuccess = createAction(FETCH_RETROS_SUCCESS)
export const fetchRetrosFailure = createAction(FETCH_RETROS_FAILURE)

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
