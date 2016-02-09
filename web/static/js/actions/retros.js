import { createAction } from "redux-actions"
import * as uuid from "node-uuid"
import _ from "lodash"

import * as ActionTypes from "app/actions"
import { lobbyChannel } from "app/channels"

export const createRetroRequest = createAction(ActionTypes.CREATE_RETRO_REQUEST)
export const createRetroSuccess = createAction(ActionTypes.CREATE_RETRO_SUCCESS)
export const createRetroFailure = createAction(ActionTypes.CREATE_RETRO_FAILURE)

export const updateEntities = createAction(ActionTypes.UPDATE_ENTITIES)

export function updateRetros(items) {
  return dispatch => {
    const retros = _.keyBy(items, "uuid")
    dispatch(updateEntities({ retros }))
  }
}

export function createRetro(dueDate = new Date()) {
  return dispatch => {
    dispatch(createRetroRequest())

    const newRetro = { uuid: uuid.v4(), due_on: dueDate }

    lobbyChannel.push("new:retrospective", newRetro)
      .receive("ok", resp => {
        dispatch(createRetroSuccess())
      })
      .receive("error", resp => {
        dispatch(createRetroFailure())
      })
  }
}

export const fetchRetrosRequest = createAction(ActionTypes.FETCH_RETROS_REQUEST)
export const fetchRetrosSuccess = createAction(ActionTypes.FETCH_RETROS_SUCCESS)
export const fetchRetrosFailure = createAction(ActionTypes.FETCH_RETROS_FAILURE)

export function fetchRetros() {
  return dispatch => {
    dispatch(fetchRetrosRequest())

    lobbyChannel.join()
      .receive("ok", resp => {
        dispatch(updateRetros(resp))
        dispatch(fetchRetrosSuccess())
      })
      .receive("error", resp => {
        dispatch(fetchRetrosFailure())
      })

    lobbyChannel.on("new:retrospective", resp => {
      dispatch(updateRetros([resp]))
    })
  }
}
