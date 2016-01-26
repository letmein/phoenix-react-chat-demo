export const CREATE_RETRO = "CREATE_RETRO"
export const INVITE_USER  = "INVITE_USER"

export function createRetro(date = new Date()) {
  return { type: CREATE_RETRO, date }
}

export function inviteUser(retroId, email) {
  return { type: INVITE_USER, retroId, email }
}
