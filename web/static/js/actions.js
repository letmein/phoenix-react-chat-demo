export const CREATE_RETRO = "CREATE_RETRO"
export const INVITE_USER  = "INVITE_USER"

import * as uuid from "node-uuid"

export function createRetro(dueDate = new Date()) {
  let data = { uuid: uuid.v1(), dueDate }
  return { type: CREATE_RETRO, data }
}

export function inviteUser(retroId, email) {
  return { type: INVITE_USER, retroId, email }
}
