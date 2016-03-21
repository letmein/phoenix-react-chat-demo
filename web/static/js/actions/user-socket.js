import { Socket } from "phoenix"
import { createAction } from "redux-actions"

import * as ActionTypes from "../action-types"
import { updateEntities } from "./entities"
import { goOnline, goOffline } from "./online"
import { receiveMessage } from "./messages"

export const openUserSocket     = createAction(ActionTypes.OPEN_USER_SOCKET)
export const closeUserSocket    = createAction(ActionTypes.CLOSE_USER_SOCKET)
export const createLobbyChannel = createAction(ActionTypes.CREATE_LOBBY_CHANNEL)
export const authenticateUser   = createAction(ActionTypes.AUTHENTICATE_USER)

export function initUserSocket(userToken, userId) {
  return dispatch => {
    const socket = new Socket("/socket", {
      params: { token: userToken }
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
        dispatch(createLobbyChannel(channel))
        dispatch(updateEntities(response))
        dispatch(goOnline(response.users))
        dispatch(authenticateUser(userId))

        channel.push("user-authenticated", userId)
      })

    channel.on("user-joined", user => {
      dispatch(updateEntities({ users: [user] }))
      dispatch(goOnline(user))
    })

    channel.on("user-left", user => {
      dispatch(goOffline(user))
    })

    channel.on("message-received", message => {
      dispatch(receiveMessage(message))
    })
  }
}
