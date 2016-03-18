import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"
import { Grid, Row, Col } from "react-bem-grid"

import CurrentUser from "../components/current-user/component.jsx"
import LoginLink from "../components/login-link/component.jsx"
import UserList from "../components/user-list/user-list.jsx"

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
  return {
    currentUser: state.currentUser,
    usersOnline: _.chain(state.entities.users).pick(state.usersOnline).value()
  } 
}

export default connect(mapStateToProps)(Root)
