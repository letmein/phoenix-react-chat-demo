import React from "react"

import { UserAvatar } from ".."

export default (props) => {
  const user     = props.user
  const userName = user.name || user.login
  const imageUrl = user.avatar_url
  return (
    <div className="current-user">
      <UserAvatar imageUrl={imageUrl} className="current-user__avatar"/>
      <span className="current-user__name">Signed in as <strong>{userName}</strong></span>
      <a className="current-user__sign-out" href="/auth/github/logout">[Logout]</a>
    </div>
  )
}
