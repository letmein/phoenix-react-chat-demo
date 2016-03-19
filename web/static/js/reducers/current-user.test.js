import { expect } from "chai"

import subject from "./current-user"

describe("current user reducer", () => {
  it('returns default state', () => {
    const action = {}
    const result = subject(undefined, action)

    expect(result).to.equal(null)
  })

  it('saves the user id', () => {
    const state = null
    const action = {
      type: 'AUTHENTICATE_USER',
      payload: 'USER_ID'
    }
    const result = subject(state, action)

    expect(result).to.equal('USER_ID')
  })
})
