import React from "react"
import _ from "lodash"

import { UserAvatar } from ".."

export default (props) => {
  const { users } = props
  const userList = _.map(users, user => (
    <li className="user-list__user" key={user.id}>
      <UserAvatar imageUrl={user.avatar_url}/>
      <span className="user-list__name">{user.login}</span>
    </li>
  ))
  return (
    <ul className="user-list">{userList}</ul>
  )
}
