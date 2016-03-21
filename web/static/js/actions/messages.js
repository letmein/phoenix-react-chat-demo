import { createAction } from "redux-actions"
import * as uuid from "node-uuid"

import * as ActionTypes from "../action-types"

export const receiveMessage = createAction(ActionTypes.RECEIVE_MESSAGE)

export const sendMessageRequest = createAction(ActionTypes.SEND_MESSAGE_REQUEST)
export const sendMessageSuccess = createAction(ActionTypes.SEND_MESSAGE_SUCCESS)
export const sendMessageFailure = createAction(ActionTypes.SEND_MESSAGE_FAILURE)

export function sendMessage(channel, user, text) {
  return dispatch => {
    const message = { text, user_id: user.id, id: uuid.v4() }
    dispatch(sendMessageRequest(text))

    channel.push("message-sent", message)
      .receive("ok", resp => {
        dispatch(sendMessageSuccess())
      })
      .receive("error", resp => {
        dispatch(sendMessageFailure())
      })
  }
}
