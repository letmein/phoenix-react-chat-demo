import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"
import { Grid, Row, Col } from "react-bem-grid"

import CurrentUser from "app/components/current-user/component.jsx"
import LoginLink from "app/components/login-link/component.jsx"

class Root extends Component {
  render() {
    const currentUser = this.props.currentUser

    if (_.isEmpty(currentUser)) {
      return ( <LoginLink/> )
    } else {
      return (
        <Grid>
          <Row smEnd>
            <Col md>
              <CurrentUser user={this.props.currentUser} />
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  } 
}

export default connect(mapStateToProps)(Root)
