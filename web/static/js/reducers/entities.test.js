import { expect } from "chai"

import subject from "./entities"

describe("entities reducer", () => {
  it('returns default state', () => {
    const action = {}
    const result = subject(undefined, action)

    expect(result).to.deep.equal({
      messages: {},
      users:    {}
    })
  })

  it('deeply merges entities', () => {
    const state = {
      foos: { a: 'a' } 
    }
    const action = {
      type: 'UPDATE_ENTITIES',
      payload: {
        foos: { b: 'b' },
        bars: { c: 'c' }
      }
    }
    const result = subject(state, action)

    expect(result).to.deep.equal({
      foos: { a: 'a', b: 'b' },
      bars: { c: 'c' }
    })
  })
})
