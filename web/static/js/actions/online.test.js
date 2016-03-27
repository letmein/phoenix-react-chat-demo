import { expect } from "chai"

import { goOnline, goOffline } from "./online"

describe("goOnline action", () => {
  it('takes an array of ids', () => {
    const result = goOnline(['USER_ID1', 'USER_ID2'])

    expect(result).to.deep.equal({
      type:    'GO_ONLINE',
      payload: ['USER_ID1', 'USER_ID2']
    })
  })
})

describe("goOffline action", () => {
  it('takes a single user id', () => {
    const result = goOffline('USER_ID')

    expect(result).to.deep.equal({
      type:    'GO_OFFLINE',
      payload: 'USER_ID'
    })
  })
})
