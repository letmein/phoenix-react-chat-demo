import React from "react"
import _ from "lodash"

import { UserAvatar } from ".."

const User = ({ user }) => {
  return (
    <li className="user-list__user">
      <UserAvatar imageUrl={user.avatar_url}/>
      <span className="user-list__name">{user.login}</span>
    </li>
  )
}

export default (props) => {
  const { users } = props
  const userList = _.map(users, user => <User user={user} key={user.id}/>)
  return (<ul className="user-list">{userList}</ul>)
}
