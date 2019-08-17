import React, { useEffect } from 'react'
import { TOKEN_FRESH_INTERVAL } from 'config/constants'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { authRefreshToken } from 'redux/modules/auth'
import { userIsAuthenticated } from 'hocs/withAuth'

const TokenMonitor = ({ authRefreshToken }) => {
  useEffect(() => {
    const handleRefreshToken = () => {
      authRefreshToken()
    }

    const timerId = setInterval(handleRefreshToken, TOKEN_FRESH_INTERVAL)
    // Specify how to clean up after this effect:
    return () => {
      clearInterval(timerId)
    }
  })

  return <div />
}

const actions = {
  authRefreshToken
}

export default compose(
  userIsAuthenticated,
  connect(
    null,
    actions
  )
)(TokenMonitor)
