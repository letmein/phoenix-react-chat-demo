import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { CurrentUser, LoginLink } from "../../components"

const Root = (props) => {
  const { currentUser, children } = props

  if (_.isEmpty(currentUser)) {
    return ( <LoginLink/> )
  } else {
    return (
      <div className="root">
        <div className="root__header">
          <nav className="root__nav">
            <CurrentUser user={currentUser}/>
          </nav>
        </div>
        <div className="root__main">{children}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const userStore   = state.entities.users
  const currentUser = userStore[state.currentUserId]
 
  return { currentUser }
}

export default connect(mapStateToProps)(Root)
