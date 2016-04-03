import React from "react"
import _ from "lodash"
import classNames from "classnames"

import { UserAvatar } from ".."

const User = ({ user, isTyping }) => {
  const userNameClasses = classNames({
    "user-list__name":        true,
    "user-list__name_typing": isTyping
  })
  return (
    <li className="user-list__user">
      <UserAvatar imageUrl={user.avatar_url}/>
      <span className={userNameClasses}>{user.login}</span>
    </li>
  )
}

export default ({ users, typingUserIds }) => {
  const userList = _.map(users, user => {
    const isTyping = _.includes(typingUserIds, user.id)
    return(<User user={user} isTyping={isTyping} key={user.id}/>)
  })
  return (<ul className="user-list">{userList}</ul>)
}
