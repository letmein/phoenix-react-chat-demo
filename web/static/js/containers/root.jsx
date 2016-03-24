import React, { Component } from "react"
import { connect } from "react-redux"
import _ from "lodash"
import { Grid, Row, Col } from "react-bem-grid"

import { CurrentUser, LoginLink, UserList, MessageList } from "../components"

import { sendMessage } from "../actions/messages"

class Root extends Component {
  handleKeyPress = event => {
    const { dispatch } = this.props

    if (event.key == 'Enter') {
      const text = event.target.value
      const { currentUser, channel } = this.props
      dispatch(sendMessage(channel, currentUser, text))
    }

    // TODO notify about typing
  };

  render() {
    const { currentUser, usersOnline, currentMessage, messages } = this.props

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
              <input type="text" onKeyPress={this.handleKeyPress} value={currentMessage} />
            </Col>
          </Row>
          <Row>
            <Col md>
              <UserList users={usersOnline} />
            </Col>
            <Col md>
              <MessageList messages={messages} />
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
  const messageStore = state.entities.messages

  const currentUser    = userStore[state.currentUserId]
  const usersOnline    = _.pick(userStore, userIds)
  const channel        = state.userSocket.channels.lobby
  const currentMessage = state.currentMessage
  const messages       = _.chain(messageStore).map(message => {
    return _.merge({}, message, { user: userStore[message.user_id] })
  }).orderBy(['sent_at', 'desc']).reverse().value()
 
  return { currentUser, usersOnline, channel, currentMessage, messages }
}

export default connect(mapStateToProps)(Root)
