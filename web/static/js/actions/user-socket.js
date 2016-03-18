import { Socket } from "phoenix"
import { createAction } from "redux-actions"

import * as ActionTypes from "../action-types"
import { updateUsers } from "./users"

export const openUserSocket     = createAction(ActionTypes.OPEN_USER_SOCKET)
export const closeUserSocket    = createAction(ActionTypes.CLOSE_USER_SOCKET)
export const createLobbyChannel = createAction(ActionTypes.CREATE_LOBBY_CHANNEL)
export const authenticateUser   = createAction(ActionTypes.AUTHENTICATE_USER)
export const goOnline           = createAction(ActionTypes.GO_ONLINE)
export const goOffline          = createAction(ActionTypes.GO_OFFLINE)

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
        const { users } = response

        dispatch(createLobbyChannel(channel))

        const user = _.find(users, { id: parseInt(userId) })
        dispatch(authenticateUser(user))

        channel.push("user-joined", user)

        const userIds = _.map(users, 'id')
        dispatch(updateUsers(users))
        dispatch(goOnline(userIds))
      })

    channel.on("user-joined", user => {
      dispatch(updateUsers([user]))
      dispatch(goOnline([user.id]))
    })

    channel.on("user-left", user => {
      dispatch(goOffline([user.id]))
    })
  }
}
