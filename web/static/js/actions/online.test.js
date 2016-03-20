import { expect } from "chai"

import { goOnline, goOffline } from "./online"

describe("goOnline action", () => {
  it('takes a single user', () => {
    const result = goOnline({ id: 'USER_ID' })

    expect(result).to.deep.equal({
      type:    'GO_ONLINE',
      payload: ['USER_ID']
    })
  })

  it('takes an array of users', () => {
    const result = goOnline([{ id: 'USER_ID1' }, { id: 'USER_ID2' }])

    expect(result).to.deep.equal({
      type:    'GO_ONLINE',
      payload: ['USER_ID1', 'USER_ID2']
    })
  })
})

describe("goOffline action", () => {
  it('takes a single user', () => {
    const result = goOffline({ id: 'USER_ID' })

    expect(result).to.deep.equal({
      type:    'GO_OFFLINE',
      payload: 'USER_ID'
    })
  })
})
