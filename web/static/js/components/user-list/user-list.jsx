import React from "react"
import _ from "lodash"

export default (props) => {
  const { users } = props
  const userList = _.map(users, user => (
    <li>
      <img src={user.avatar_url} height="32" width="32" title={user.login}/>
    </li>
  ))
  return (
    <ul>{userList}</ul>
  )
}
