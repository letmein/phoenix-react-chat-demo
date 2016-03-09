import { Socket } from "phoenix"

import * as ActionTypes from "app/actions"

import { createAction } from "redux-actions"

export const openUserSocket     = createAction(ActionTypes.OPEN_USER_SOCKET)
export const closeUserSocket    = createAction(ActionTypes.CLOSE_USER_SOCKET)
export const createLobbyChannel = createAction(ActionTypes.CREATE_LOBBY_CHANNEL)
export const authenticateUser   = createAction(ActionTypes.AUTHENTICATE_USER)

export function initUserSocket(userToken, userId) {
  return dispatch => {
    const socket = new Socket("/socket", {
      params: { token: userToken }
      //logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
    })

    socket.onOpen(() => {
      dispatch(openUserSocket(socket)) 
      dispatch(initLobbyChannel(socket, userId))
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

export function initLobbyChannel(socket, userId) {
  return dispatch => {
    const channel = socket.channel("users:lobby")

    channel.join()
      .receive("ok", (response) => {
        channel.push("user-joined", response)
        dispatch(createLobbyChannel(channel))
        dispatch(authenticateUser(response))
      })

    channel.on("user-joined", resp => {
      console.log("user-joined", resp)
    })

    channel.on("user-left", resp => {
      console.log("user-left", resp)
    })
  }
}
