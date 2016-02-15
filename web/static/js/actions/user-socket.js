import { Socket } from "phoenix"

import * as ActionTypes from "app/actions"

import { createAction } from "redux-actions"

export const openUserSocket = createAction(ActionTypes.OPEN_USER_SOCKET)
export const closeUserSocket = createAction(ActionTypes.CLOSE_USER_SOCKET)
export const joinUserChannel = createAction(ActionTypes.JOIN_USER_CHANNEL)
export const authenticateUser = createAction(ActionTypes.AUTHENTICATE_USER)

export function initUserSocket(userToken, userId) {
  return dispatch => {
    const socket = new Socket("/socket", {
      params: { token: userToken }
      //logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
    })

    socket.onOpen(() => {
      dispatch(openUserSocket(socket)) 
      dispatch(initUserChannel(socket, userId))
    })

    socket.onClose(() => {
      dispatch(closeUserSocket()) 
    })

    socket.onError(()  => {
      console.log('can not open websocket..') 
    })

    socket.connect()
  }
}

export function initUserChannel(socket, userId) {
  return dispatch => {
    const channel = socket.channel(`users:${userId}`)
    channel.join()
      .receive("ok", (response) => {
        dispatch(joinUserChannel(channel))
        dispatch(authenticateUser(response))
      })
  }
}
