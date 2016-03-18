import React from "react"

export default (props) => {
  const user     = props.user
  const userName = user.name || user.login
  return (
    <div className="current-user">
      <img src={user.avatar_url} height="32" width="32" className="current-user__avatar"/>
      <span className="current-user__name">Signed in as <strong>{userName}</strong></span>
      <a className="current-user__sign-out" href="/auth/github/logout">[Logout]</a>
    </div>
  )
}
