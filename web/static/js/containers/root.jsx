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
  const userIds = _.without(state.usersOnline, _.get(state.currentUser, 'id'))
  return {
    currentUser: state.currentUser,
    usersOnline: _.chain(state.entities.users).pick(userIds).value()
  } 
}

export default connect(mapStateToProps)(Root)
