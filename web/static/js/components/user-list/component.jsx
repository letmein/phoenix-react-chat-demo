import React from "react"
import _ from "lodash"

import { UserAvatar } from ".."

export default (props) => {
  const { users } = props
  const userList = _.map(users, user => (
    <li className="user-list__user">
      <span title={user.login}>
        <UserAvatar imageUrl={user.avatar_url}/>
      </span>
    </li>
  ))
  return (
    <ul className="user-list">{userList}</ul>
  )
}
