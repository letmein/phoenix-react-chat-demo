import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"
import { Grid, Row, Col } from "react-bem-grid"

import { CurrentUser, LoginLink, UserList } from "../components"

class Root extends Component {
  render() {
    const { currentUser, usersOnline } = this.props

    if (_.isEmpty(currentUser)) {
      return ( <LoginLink/> )
    } else {
      return (
        <Grid>
          <Row smEnd>
            <Col md>
              <CurrentUser user={currentUser} />
            </Col>
          </Row>
          <Row>
            <Col md>
              <UserList users={usersOnline} />
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}

function mapStateToProps(state) {
  const userStore = state.entities.users
  const userIds   = _.without(state.usersOnline, state.currentUserId)

  const currentUser = userStore[state.currentUserId]
  const usersOnline = _.pick(userStore, userIds)
 
  return { currentUser, usersOnline }
}

export default connect(mapStateToProps)(Root)
